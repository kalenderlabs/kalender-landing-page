// Dados fake centralizados para os mockups da landing page
// Contexto: salão de beleza brasileiro

export type AppointmentStatus = "confirmed" | "pending" | "in_progress"

export interface MockAppointment {
  client: string
  service: string
  professional: string
  status: AppointmentStatus
  day: number // 0=Seg, 1=Ter, 2=Qua, 3=Qui, 4=Sex
  startHour: number // ex: 8.5 = 08:30
  duration: number // em horas, ex: 1.5 = 1h30
}

export const WEEK_DAYS = [
  { abbr: "Seg", num: 9 },
  { abbr: "Ter", num: 10 },
  { abbr: "Qua", num: 11, isToday: true },
  { abbr: "Qui", num: 12 },
  { abbr: "Sex", num: 13 },
]

export const BUSINESS_START = 9
export const BUSINESS_END = 17

export const STATUS_COLORS: Record<AppointmentStatus, string> = {
  confirmed: "#22c55e",
  pending: "#f59e0b",
  in_progress: "#0EA5E9",
}

export const STATUS_LABELS: Record<AppointmentStatus, string> = {
  confirmed: "Confirmado",
  pending: "Pendente",
  in_progress: "Em atend.",
}

export const APPOINTMENTS: MockAppointment[] = [
  {
    client: "Ana Clara",
    service: "Corte + Escova",
    professional: "Juliana",
    status: "confirmed",
    day: 0,
    startHour: 9,
    duration: 1.5,
  },
  {
    client: "Beatriz Souza",
    service: "Coloração",
    professional: "Camila",
    status: "confirmed",
    day: 0,
    startHour: 14,
    duration: 2,
  },
  {
    client: "Carla Mendes",
    service: "Manicure",
    professional: "Fernanda",
    status: "pending",
    day: 1,
    startHour: 10,
    duration: 1,
  },
  {
    client: "Daniela Reis",
    service: "Escova Progressiva",
    professional: "Juliana",
    status: "confirmed",
    day: 1,
    startHour: 15,
    duration: 2,
  },
  {
    client: "Eduarda Lima",
    service: "Corte Feminino",
    professional: "Camila",
    status: "in_progress",
    day: 2,
    startHour: 9.5,
    duration: 1,
  },
  {
    client: "Fernanda Costa",
    service: "Hidratação",
    professional: "Fernanda",
    status: "confirmed",
    day: 2,
    startHour: 11,
    duration: 1.5,
  },
  {
    client: "Gabriela Alves",
    service: "Mechas",
    professional: "Juliana",
    status: "pending",
    day: 3,
    startHour: 9,
    duration: 2.5,
  },
  {
    client: "Helena Barbosa",
    service: "Corte + Barba",
    professional: "Camila",
    status: "confirmed",
    day: 4,
    startHour: 10,
    duration: 1,
  },
  {
    client: "Isabela Nunes",
    service: "Penteado",
    professional: "Juliana",
    status: "confirmed",
    day: 4,
    startHour: 14,
    duration: 1.5,
  },
]

// Dados do WhatsApp
export const WHATSAPP_MESSAGES = [
  {
    from: "bot" as const,
    text: "Ola Ana! Seu agendamento foi registrado.",
  },
  {
    from: "bot" as const,
    isCard: true,
    service: "Corte + Escova",
    date: "Qua, 11 Jun",
    time: "09:30",
    professional: "Juliana",
  },
  {
    from: "bot" as const,
    text: "Deseja confirmar sua presenca?",
  },
  {
    from: "client" as const,
    text: "Sim, confirmado!",
  },
  {
    from: "bot" as const,
    text: "Perfeito! Ate la! Qualquer alteracao, e so avisar.",
  },
]

// Dados da comanda
export const COMANDA = {
  ticket: "#00847",
  client: "Ana Clara",
  items: [
    { service: "Corte Feminino", professional: "Juliana", value: 85 },
    { service: "Escova", professional: "Juliana", value: 60 },
    { service: "Manicure", professional: "Fernanda", value: 100 },
  ],
  total: 245,
  method: "PIX",
}

// Dados de comissões
export const COMMISSIONS = {
  total: 4280,
  kpis: [
    { label: "Pago", value: 2850, color: "emerald" as const },
    { label: "Aprovado", value: 980, color: "blue" as const },
    { label: "Pendente", value: 450, color: "amber" as const },
  ],
  professionals: [
    {
      name: "Juliana",
      initials: "JU",
      appointments: 32,
      value: 1890,
      percent: 100,
    },
    {
      name: "Camila",
      initials: "CA",
      appointments: 28,
      value: 1420,
      percent: 75,
    },
    {
      name: "Fernanda",
      initials: "FE",
      appointments: 19,
      value: 970,
      percent: 51,
    },
  ],
}
