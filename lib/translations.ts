import type { Locale } from "./i18n"

type TranslationKeys = {
  // Header
  header: {
    platform: string
    features: string
    segments: string
    pricing: string
    login: string
    free_trial: string
  }

  // Navigation
  nav: {
    dashboard: string
    schedule: string
    team_management: string
    whatsapp_bot: string
    integrations: string
    reports: string
    api: string
    beauty_salons: string
    clinics: string
    spas: string
    gyms: string
  }

  // Sidebar
  sidebar: {
    schedule: string
    services: string
    professionals: string
    reports: string
    billing: string
    settings: string
    notifications: string
    help: string
    logout: string
    system_status: string
    all_systems_operational: string
  }

  // Dashboard
  dashboard: {
    welcome: string
    overview: string
    appointments_today: string
    clients_this_month: string
    revenue_this_month: string
    occupancy_rate: string
    next_appointments: string
    quick_actions: string
    new_schedule: string
    new_service: string
    professionals: string
    reports: string
    performance: string
    above_target: string
  }

  // Hero Section
  hero: {
    badge: string
    title: string
    title_highlight: string
    description: string
    setup_time: string
    setup_description: string
    uptime: string
    uptime_description: string
    start_free_trial: string
    view_pricing: string
    free_trial_note: string
  }

  // Features
  features: {
    title: string
    subtitle: string
    smart_scheduling: string
    smart_scheduling_desc: string
    whatsapp_telegram: string
    whatsapp_telegram_desc: string
    integrations: string
    integrations_desc: string
  }

  // Benefits
  benefits: {
    title: string
    revenue_increase: string
    revenue_increase_desc: string
    no_shows_reduction: string
    no_shows_reduction_desc: string
    time_savings: string
    time_savings_desc: string
    satisfaction: string
    satisfaction_desc: string
    setup_title: string
    setup_subtitle: string
    step1: string
    step2: string
    step3: string
  }

  // Pricing
  pricing: {
    title: string
    title_highlight: string
    subtitle: string
    monthly: string
    annual: string
    save_30: string
    annual_savings: string
    annual_description: string
    important_note: string
    professionals_question: string
    professionals_input: string
    professionals_unit: string
    recommended_plan: string
    enterprise_plan: string
    per_month: string
    billed_annually: string
    start_free_trial: string
    free_trial_note: string
  }

  // Plans
  plans: {
    start: {
      name: string
      description: string
    }
    essential: {
      name: string
      description: string
    }
    advanced: {
      name: string
      description: string
    }
    pro: {
      name: string
      description: string
    }
    enterprise: {
      name: string
      description: string
    }
  }

  // Login
  login: {
    title: string
    subtitle: string
    email: string
    password: string
    remember_me: string
    forgot_password: string
    sign_in: string
    signing_in: string
    or: string
    create_account: string
    terms_privacy: string
    back_to_home: string
  }

  // Common
  common: {
    loading: string
    save: string
    cancel: string
    edit: string
    delete: string
    add: string
    search: string
    filter: string
    all: string
    active: string
    inactive: string
    confirmed: string
    pending: string
    cancelled: string
  }
}

export const translations: Record<Locale, TranslationKeys> = {
  "pt-BR": {
    header: {
      platform: "Plataforma",
      features: "Recursos",
      segments: "Segmentos",
      pricing: "Preços",
      login: "Entrar",
      free_trial: "Teste Grátis",
    },
    nav: {
      dashboard: "Dashboard",
      schedule: "Agenda",
      team_management: "Equipe",
      whatsapp_bot: "WhatsApp Bot",
      integrations: "Integrações",
      reports: "Relatórios",
      api: "API",
      beauty_salons: "Salões de Beleza",
      clinics: "Clínicas",
      spas: "Spas",
      gyms: "Academias",
    },
    sidebar: {
      schedule: "Agenda",
      services: "Serviços",
      professionals: "Profissionais",
      reports: "Relatórios",
      billing: "Financeiro",
      settings: "Configurações",
      notifications: "Notificações",
      help: "Ajuda",
      logout: "Sair da Conta",
      system_status: "Status do Sistema",
      all_systems_operational: "Todos os sistemas operacionais",
    },
    dashboard: {
      welcome: "Dashboard Principal 👋",
      overview: "Visão geral do seu estabelecimento e performance",
      appointments_today: "Agendamentos Hoje",
      clients_this_month: "Clientes Este Mês",
      revenue_this_month: "Receita Este Mês",
      occupancy_rate: "Taxa de Ocupação",
      next_appointments: "Próximos Agendamentos",
      quick_actions: "Ações Rápidas",
      new_schedule: "Nova Agenda",
      new_service: "Novo Serviço",
      professionals: "Profissionais",
      reports: "Relatórios",
      performance: "Performance do Mês",
      above_target: "Você está 24% acima da meta!",
    },
    hero: {
      badge: "IA Avançada • Disponível Agora",
      title: "Agendamento Inteligente",
      title_highlight: "que Aumenta sua Receita",
      description:
        "Plataforma completa com IA que otimiza automaticamente sua agenda, reduz cancelamentos e aumenta a satisfação dos clientes.",
      setup_time: "5 min",
      setup_description: "Para configurar",
      uptime: "99.9%",
      uptime_description: "De disponibilidade",
      start_free_trial: "Começar Teste Grátis",
      view_pricing: "Ver Preços",
      free_trial_note: "15 dias grátis • Sem cartão de crédito",
    },
    features: {
      title: "Recursos Poderosos",
      subtitle: "Tudo que você precisa para gerenciar seu negócio com eficiência",
      smart_scheduling: "Agendamento Inteligente",
      smart_scheduling_desc: "IA otimiza automaticamente horários e reduz conflitos",
      whatsapp_telegram: "WhatsApp & Telegram",
      whatsapp_telegram_desc: "Agendamento automático via chat com linguagem natural",
      integrations: "Integrações Avançadas",
      integrations_desc: "Conecte com ERPs, Google Calendar e muito mais",
    },
    benefits: {
      title: "Resultados Comprovados",
      revenue_increase: "Aumento de 40% na Receita",
      revenue_increase_desc: "Otimização automática da agenda maximiza ocupação",
      no_shows_reduction: "60% Menos Cancelamentos",
      no_shows_reduction_desc: "Lembretes inteligentes e confirmações automáticas",
      time_savings: "3h Economizadas por Dia",
      time_savings_desc: "Automação completa libera tempo para focar no cliente",
      satisfaction: "98% de Satisfação",
      satisfaction_desc: "Clientes adoram a facilidade de agendamento",
      setup_title: "Configuração em 5 Minutos",
      setup_subtitle: "Comece a usar hoje mesmo",
      step1: "Cadastre sua empresa",
      step2: "Configure serviços e horários",
      step3: "Comece a receber agendamentos",
    },
    pricing: {
      title: "Preços Simples",
      title_highlight: "Resultados Extraordinários",
      subtitle: "Escolha o plano ideal para o tamanho da sua equipe. Todos incluem 15 dias de teste grátis.",
      monthly: "Mensal",
      annual: "Anual",
      save_30: "Economize 30%",
      annual_savings: "🎉 Economia Máxima no Plano Anual",
      annual_description:
        "Pague à vista e economize 30% em qualquer plano. Ideal para estabelecimentos que querem o melhor custo-benefício.",
      important_note:
        "O pagamento anual é cobrado integralmente após o teste grátis e não é reembolsável. O valor mensal mostrado é apenas para comparação.",
      professionals_question: "Quantos profissionais trabalham no seu estabelecimento?",
      professionals_input: "Número de profissionais:",
      professionals_unit: "profissionais",
      recommended_plan: "Plano Recomendado:",
      enterprise_plan: "Plano Enterprise - Fale Conosco",
      per_month: "/mês",
      billed_annually: "cobrado anualmente",
      start_free_trial: "Começar Teste Grátis",
      free_trial_note: "15 dias grátis • Cancele quando quiser",
    },
    plans: {
      start: {
        name: "Start",
        description: "Perfeito para começar",
      },
      essential: {
        name: "Essencial",
        description: "Mais popular para pequenas equipes",
      },
      advanced: {
        name: "Avançado",
        description: "Para equipes em crescimento",
      },
      pro: {
        name: "Pro",
        description: "Máximo desempenho",
      },
      enterprise: {
        name: "Enterprise",
        description: "Solução personalizada para grandes empresas",
      },
    },
    login: {
      title: "Bem-vindo de volta",
      subtitle: "Acesse sua conta para gerenciar seus agendamentos",
      email: "E-mail",
      password: "Senha",
      remember_me: "Lembrar de mim",
      forgot_password: "Esqueci minha senha",
      sign_in: "Entrar",
      signing_in: "Entrando...",
      or: "ou",
      create_account: "Criar nova conta",
      terms_privacy: "Ao continuar, você concorda com nossos Termos e Política de Privacidade",
      back_to_home: "Voltar ao início",
    },
    common: {
      loading: "Carregando...",
      save: "Salvar",
      cancel: "Cancelar",
      edit: "Editar",
      delete: "Excluir",
      add: "Adicionar",
      search: "Buscar",
      filter: "Filtrar",
      all: "Todos",
      active: "Ativo",
      inactive: "Inativo",
      confirmed: "Confirmado",
      pending: "Pendente",
      cancelled: "Cancelado",
    },
  },
  "en-US": {
    header: {
      platform: "Platform",
      features: "Features",
      segments: "Segments",
      pricing: "Pricing",
      login: "Login",
      free_trial: "Free Trial",
    },
    nav: {
      dashboard: "Dashboard",
      schedule: "Schedule",
      team_management: "Team",
      whatsapp_bot: "WhatsApp Bot",
      integrations: "Integrations",
      reports: "Reports",
      api: "API",
      beauty_salons: "Beauty Salons",
      clinics: "Clinics",
      spas: "Spas",
      gyms: "Gyms",
    },
    sidebar: {
      schedule: "Schedule",
      services: "Services",
      professionals: "Professionals",
      reports: "Reports",
      billing: "Billing",
      settings: "Settings",
      notifications: "Notifications",
      help: "Help",
      logout: "Sign Out",
      system_status: "System Status",
      all_systems_operational: "All systems operational",
    },
    dashboard: {
      welcome: "Main Dashboard 👋",
      overview: "Overview of your establishment and performance",
      appointments_today: "Appointments Today",
      clients_this_month: "Clients This Month",
      revenue_this_month: "Revenue This Month",
      occupancy_rate: "Occupancy Rate",
      next_appointments: "Next Appointments",
      quick_actions: "Quick Actions",
      new_schedule: "New Schedule",
      new_service: "New Service",
      professionals: "Professionals",
      reports: "Reports",
      performance: "Month Performance",
      above_target: "You are 24% above target!",
    },
    hero: {
      badge: "Advanced AI • Available Now",
      title: "Smart Scheduling",
      title_highlight: "that Increases Revenue",
      description:
        "Complete AI-powered platform that automatically optimizes your schedule, reduces cancellations and increases customer satisfaction.",
      setup_time: "5 min",
      setup_description: "To setup",
      uptime: "99.9%",
      uptime_description: "Uptime",
      start_free_trial: "Start Free Trial",
      view_pricing: "View Pricing",
      free_trial_note: "15 days free • No credit card required",
    },
    features: {
      title: "Powerful Features",
      subtitle: "Everything you need to manage your business efficiently",
      smart_scheduling: "Smart Scheduling",
      smart_scheduling_desc: "AI automatically optimizes schedules and reduces conflicts",
      whatsapp_telegram: "WhatsApp & Telegram",
      whatsapp_telegram_desc: "Automatic scheduling via chat with natural language",
      integrations: "Advanced Integrations",
      integrations_desc: "Connect with ERPs, Google Calendar and much more",
    },
    benefits: {
      title: "Proven Results",
      revenue_increase: "40% Revenue Increase",
      revenue_increase_desc: "Automatic schedule optimization maximizes occupancy",
      no_shows_reduction: "60% Fewer Cancellations",
      no_shows_reduction_desc: "Smart reminders and automatic confirmations",
      time_savings: "3h Saved per Day",
      time_savings_desc: "Complete automation frees time to focus on customers",
      satisfaction: "98% Satisfaction",
      satisfaction_desc: "Customers love the ease of scheduling",
      setup_title: "5-Minute Setup",
      setup_subtitle: "Start using today",
      step1: "Register your business",
      step2: "Configure services and hours",
      step3: "Start receiving appointments",
    },
    pricing: {
      title: "Simple Pricing",
      title_highlight: "Extraordinary Results",
      subtitle: "Choose the ideal plan for your team size. All include 15 days free trial.",
      monthly: "Monthly",
      annual: "Annual",
      save_30: "Save 30%",
      annual_savings: "🎉 Maximum Savings on Annual Plan",
      annual_description: "Pay upfront and save 30% on any plan. Ideal for establishments that want the best value.",
      important_note:
        "Annual payment is charged in full after the free trial and is non-refundable. The monthly amount shown is for comparison only.",
      professionals_question: "How many professionals work at your establishment?",
      professionals_input: "Number of professionals:",
      professionals_unit: "professionals",
      recommended_plan: "Recommended Plan:",
      enterprise_plan: "Enterprise Plan - Contact Us",
      per_month: "/month",
      billed_annually: "billed annually",
      start_free_trial: "Start Free Trial",
      free_trial_note: "15 days free • Cancel anytime",
    },
    plans: {
      start: {
        name: "Start",
        description: "Perfect to get started",
      },
      essential: {
        name: "Essential",
        description: "Most popular for small teams",
      },
      advanced: {
        name: "Advanced",
        description: "For growing teams",
      },
      pro: {
        name: "Pro",
        description: "Maximum performance",
      },
      enterprise: {
        name: "Enterprise",
        description: "Custom solution for large companies",
      },
    },
    login: {
      title: "Welcome back",
      subtitle: "Access your account to manage your appointments",
      email: "Email",
      password: "Password",
      remember_me: "Remember me",
      forgot_password: "Forgot password",
      sign_in: "Sign In",
      signing_in: "Signing in...",
      or: "or",
      create_account: "Create new account",
      terms_privacy: "By continuing, you agree to our Terms and Privacy Policy",
      back_to_home: "Back to home",
    },
    common: {
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      add: "Add",
      search: "Search",
      filter: "Filter",
      all: "All",
      active: "Active",
      inactive: "Inactive",
      confirmed: "Confirmed",
      pending: "Pending",
      cancelled: "Cancelled",
    },
  },
  "es-ES": {
    header: {
      platform: "Plataforma",
      features: "Características",
      segments: "Segmentos",
      pricing: "Precios",
      login: "Iniciar Sesión",
      free_trial: "Prueba Gratuita",
    },
    nav: {
      dashboard: "Panel",
      schedule: "Agenda",
      team_management: "Equipo",
      whatsapp_bot: "Bot WhatsApp",
      integrations: "Integraciones",
      reports: "Informes",
      api: "API",
      beauty_salons: "Salones de Belleza",
      clinics: "Clínicas",
      spas: "Spas",
      gyms: "Gimnasios",
    },
    sidebar: {
      schedule: "Agenda",
      services: "Servicios",
      professionals: "Profesionales",
      reports: "Informes",
      billing: "Facturación",
      settings: "Configuración",
      notifications: "Notificaciones",
      help: "Ayuda",
      logout: "Cerrar Sesión",
      system_status: "Estado del Sistema",
      all_systems_operational: "Todos los sistemas operativos",
    },
    dashboard: {
      welcome: "Panel Principal 👋",
      overview: "Resumen de tu establecimiento y rendimiento",
      appointments_today: "Citas Hoy",
      clients_this_month: "Clientes Este Mes",
      revenue_this_month: "Ingresos Este Mes",
      occupancy_rate: "Tasa de Ocupación",
      next_appointments: "Próximas Citas",
      quick_actions: "Acciones Rápidas",
      new_schedule: "Nueva Agenda",
      new_service: "Nuevo Servicio",
      professionals: "Profesionales",
      reports: "Informes",
      performance: "Rendimiento del Mes",
      above_target: "¡Estás 24% por encima del objetivo!",
    },
    hero: {
      badge: "IA Avanzada • Disponible Ahora",
      title: "Programación Inteligente",
      title_highlight: "que Aumenta tus Ingresos",
      description:
        "Plataforma completa con IA que optimiza automáticamente tu agenda, reduce cancelaciones y aumenta la satisfacción del cliente.",
      setup_time: "5 min",
      setup_description: "Para configurar",
      uptime: "99.9%",
      uptime_description: "De disponibilidad",
      start_free_trial: "Comenzar Prueba Gratuita",
      view_pricing: "Ver Precios",
      free_trial_note: "15 días gratis • Sin tarjeta de crédito",
    },
    features: {
      title: "Características Poderosas",
      subtitle: "Todo lo que necesitas para gestionar tu negocio eficientemente",
      smart_scheduling: "Programación Inteligente",
      smart_scheduling_desc: "IA optimiza automáticamente horarios y reduce conflictos",
      whatsapp_telegram: "WhatsApp y Telegram",
      whatsapp_telegram_desc: "Programación automática vía chat con lenguaje natural",
      integrations: "Integraciones Avanzadas",
      integrations_desc: "Conecta con ERPs, Google Calendar y mucho más",
    },
    benefits: {
      title: "Resultados Comprobados",
      revenue_increase: "40% Aumento en Ingresos",
      revenue_increase_desc: "Optimización automática de agenda maximiza ocupación",
      no_shows_reduction: "60% Menos Cancelaciones",
      no_shows_reduction_desc: "Recordatorios inteligentes y confirmaciones automáticas",
      time_savings: "3h Ahorradas por Día",
      time_savings_desc: "Automatización completa libera tiempo para enfocarse en clientes",
      satisfaction: "98% de Satisfacción",
      satisfaction_desc: "Los clientes aman la facilidad de programación",
      setup_title: "Configuración en 5 Minutos",
      setup_subtitle: "Comienza a usar hoy mismo",
      step1: "Registra tu empresa",
      step2: "Configura servicios y horarios",
      step3: "Comienza a recibir citas",
    },
    pricing: {
      title: "Precios Simples",
      title_highlight: "Resultados Extraordinarios",
      subtitle: "Elige el plan ideal para el tamaño de tu equipo. Todos incluyen 15 días de prueba gratuita.",
      monthly: "Mensual",
      annual: "Anual",
      save_30: "Ahorra 30%",
      annual_savings: "🎉 Máximo Ahorro en Plan Anual",
      annual_description:
        "Paga por adelantado y ahorra 30% en cualquier plan. Ideal para establecimientos que quieren el mejor valor.",
      important_note:
        "El pago anual se cobra íntegramente después de la prueba gratuita y no es reembolsable. El monto mensual mostrado es solo para comparación.",
      professionals_question: "¿Cuántos profesionales trabajan en tu establecimiento?",
      professionals_input: "Número de profesionales:",
      professionals_unit: "profesionales",
      recommended_plan: "Plan Recomendado:",
      enterprise_plan: "Plan Enterprise - Contáctanos",
      per_month: "/mes",
      billed_annually: "facturado anualmente",
      start_free_trial: "Comenzar Prueba Gratuita",
      free_trial_note: "15 días gratis • Cancela cuando quieras",
    },
    plans: {
      start: {
        name: "Inicio",
        description: "Perfecto para comenzar",
      },
      essential: {
        name: "Esencial",
        description: "Más popular para equipos pequeños",
      },
      advanced: {
        name: "Avanzado",
        description: "Para equipos en crecimiento",
      },
      pro: {
        name: "Pro",
        description: "Máximo rendimiento",
      },
      enterprise: {
        name: "Enterprise",
        description: "Solución personalizada para grandes empresas",
      },
    },
    login: {
      title: "Bienvenido de vuelta",
      subtitle: "Accede a tu cuenta para gestionar tus citas",
      email: "Correo electrónico",
      password: "Contraseña",
      remember_me: "Recordarme",
      forgot_password: "Olvidé mi contraseña",
      sign_in: "Iniciar Sesión",
      signing_in: "Iniciando sesión...",
      or: "o",
      create_account: "Crear nueva cuenta",
      terms_privacy: "Al continuar, aceptas nuestros Términos y Política de Privacidad",
      back_to_home: "Volver al inicio",
    },
    common: {
      loading: "Cargando...",
      save: "Guardar",
      cancel: "Cancelar",
      edit: "Editar",
      delete: "Eliminar",
      add: "Agregar",
      search: "Buscar",
      filter: "Filtrar",
      all: "Todos",
      active: "Activo",
      inactive: "Inactivo",
      confirmed: "Confirmado",
      pending: "Pendiente",
      cancelled: "Cancelado",
    },
  },
}
