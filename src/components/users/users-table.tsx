import type { School, User } from "@/types";

type UsersTableProps = {
  onResetPassword: (user: User) => void;
  schools: School[];
  users: User[];
};

export function UsersTable(props: UsersTableProps) {
  const { onResetPassword, schools, users } = props;
  const schoolNameById = new Map(schools.map((school) => [school.id, school.name]));

  return (
    <section className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Daftar User</h2>
          <p className="mt-1 text-sm text-[#748299]">
            Akun yang sudah terdaftar di sistem.
          </p>
        </div>
        <span className="rounded-full bg-[#f2d35f] px-3 py-1 text-sm font-semibold">
          {users.length} akun
        </span>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-[#dbe5f4] text-[#748299]">
            <tr>
              <th className="py-3 font-semibold">Nama</th>
              <th className="py-3 font-semibold">Email</th>
              <th className="py-3 font-semibold">Role</th>
              <th className="py-3 font-semibold">Sekolah</th>
              <th className="py-3 font-semibold">Dibuat</th>
              <th className="py-3 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eef3fb]">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-3 font-semibold text-[#172033]">
                  {user.name}
                </td>
                <td className="py-3 text-[#526078]">{user.email}</td>
                <td className="py-3">
                  <span className="rounded-full bg-[#eaf2ff] px-3 py-1 text-xs font-semibold uppercase text-[#1f4f8f]">
                    {user.role}
                  </span>
                </td>
                <td className="py-3 text-[#526078]">
                  {user.schoolId ? schoolNameById.get(user.schoolId) ?? "-" : "-"}
                </td>
                <td className="py-3 text-[#526078]">
                  {new Date(user.createdAt).toLocaleDateString("id-ID")}
                </td>
                <td className="py-3">
                  <button
                    type="button"
                    onClick={() => onResetPassword(user)}
                    className="rounded-md border border-[#dbe5f4] px-3 py-2 text-xs font-semibold text-[#1f4f8f] transition hover:bg-[#eef5ff]"
                  >
                    Reset Password
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
