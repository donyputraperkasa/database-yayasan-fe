"use client";

import { useEffect, useState } from "react";

type FileState = {
  error: string | null;
  key: string | null;
  url: string | null;
};

export function usePrivateFile(
  key: string | null | undefined,
  loadFile: (() => Promise<Blob>) | null,
) {
  const [state, setState] = useState<FileState>({
    error: null,
    key: null,
    url: null,
  });

  useEffect(() => {
    let objectUrl: string | null = null;
    let active = true;
    if (!key || !loadFile) return;

    loadFile()
      .then((blob) => {
        if (!active) return;
        objectUrl = URL.createObjectURL(blob);
        setState({ error: null, key, url: objectUrl });
      })
      .catch((loadError) => {
        if (active) {
          setState({
            error: loadError instanceof Error ? loadError.message : "File gagal dimuat.",
            key,
            url: null,
          });
        }
      });

    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [key, loadFile]);

  const isCurrent = Boolean(key) && state.key === key;

  return {
    error: isCurrent ? state.error : null,
    isLoading: Boolean(key) && !isCurrent,
    url: isCurrent ? state.url : null,
  };
}
