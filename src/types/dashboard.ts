export type DashboardTotals = {
  schools: number;
  students: number;
  employees: number;
  teachers: number;
  staff: number;
  permanentEmployees: number;
  nonPermanentEmployees: number;
  honoraryEmployees: number;
  assets: number;
  facilities: number;
  finances: number;
  documents: number;
};

export type SchoolsByLevel = {
  tkKb: number;
  sd: number;
  smp: number;
  smaSmk: number;
};

export type DashboardGroupCount = {
  schoolId: string;
  _count: {
    _all: number;
  };
};

export type DashboardSummary = {
  totals: DashboardTotals;
  schoolsByLevel: SchoolsByLevel;
  studentsBySchool: DashboardGroupCount[];
  employeesBySchool: DashboardGroupCount[];
};

export type DashboardStat = {
  label: string;
  value: string;
  note: string;
};

export type DashboardProgress = {
  title: string;
  progress: number;
};
