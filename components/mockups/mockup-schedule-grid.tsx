import {
  APPOINTMENTS,
  BUSINESS_END,
  BUSINESS_START,
  STATUS_COLORS,
  WEEK_DAYS,
  type MockAppointment,
} from "./mockup-data"

const HOUR_HEIGHT = 32
const HOURS = Array.from(
  { length: BUSINESS_END - BUSINESS_START },
  (_, i) => BUSINESS_START + i
)

function formatHour(h: number) {
  return `${String(h).padStart(2, "0")}:00`
}

function AppointmentBlock({
  appointment,
  compact,
}: {
  appointment: MockAppointment
  compact: boolean
}) {
  const top = (appointment.startHour - BUSINESS_START) * HOUR_HEIGHT
  const height = appointment.duration * HOUR_HEIGHT
  const color = STATUS_COLORS[appointment.status]

  return (
    <div
      className="absolute left-0.5 right-0.5 rounded-sm overflow-hidden bg-white/80 dark:bg-zinc-800/80"
      style={{
        top: `${top}px`,
        height: `${height}px`,
        borderLeft: `3px solid ${color}`,
      }}
    >
      <div className="px-1 py-0.5">
        <div
          className="truncate font-medium text-zinc-700 dark:text-zinc-200"
          style={{ fontSize: compact ? "9px" : "11px", lineHeight: "1.3" }}
        >
          {appointment.client}
        </div>
        {!compact && height >= HOUR_HEIGHT && (
          <div
            className="truncate text-zinc-500 dark:text-zinc-400"
            style={{ fontSize: "9px", lineHeight: "1.3" }}
          >
            {appointment.service}
          </div>
        )}
      </div>
    </div>
  )
}

function CurrentTimeIndicator() {
  // Fixed at 10:30 for visual purposes
  const top = (10.5 - BUSINESS_START) * HOUR_HEIGHT
  return (
    <div className="absolute left-0 right-0 z-10 pointer-events-none" style={{ top: `${top}px` }}>
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-red-500 -ml-1 flex-shrink-0" />
        <div className="flex-1 h-px bg-red-500" />
      </div>
    </div>
  )
}

export function MockupScheduleGrid({ variant = "hero" }: { variant?: "hero" | "compact" }) {
  const compact = variant === "compact"
  const totalHeight = HOURS.length * HOUR_HEIGHT

  return (
    <div
      className="w-full h-full select-none overflow-hidden"
      aria-hidden="true"
      role="img"
      aria-label="Agenda semanal do Kalender"
    >
      <div className="flex h-full flex-col">
        {/* Day header */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-700 flex-shrink-0">
          <div className="flex-shrink-0" style={{ width: compact ? "28px" : "36px" }} />
          {WEEK_DAYS.map((day) => (
            <div
              key={day.abbr}
              className="flex-1 text-center py-1.5 border-l border-zinc-200 dark:border-zinc-700"
            >
              <div
                className="text-zinc-500 dark:text-zinc-400 font-medium"
                style={{ fontSize: compact ? "9px" : "10px" }}
              >
                {day.abbr}
              </div>
              <div className="flex items-center justify-center mt-0.5">
                {day.isToday ? (
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white font-bold"
                    style={{ fontSize: "10px" }}
                  >
                    {day.num}
                  </span>
                ) : (
                  <span
                    className="text-zinc-700 dark:text-zinc-300 font-semibold"
                    style={{ fontSize: "11px" }}
                  >
                    {day.num}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Grid body */}
        <div className="flex-1 overflow-hidden">
          <div className="flex relative" style={{ height: `${totalHeight}px` }}>
            {/* Time column */}
            <div
              className="flex-shrink-0 relative"
              style={{ width: compact ? "28px" : "36px" }}
            >
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  className="absolute right-1 text-zinc-400 dark:text-zinc-500"
                  style={{
                    top: `${(hour - BUSINESS_START) * HOUR_HEIGHT}px`,
                    fontSize: compact ? "8px" : "9px",
                    lineHeight: "1",
                    transform: "translateY(-50%)",
                  }}
                >
                  {formatHour(hour)}
                </div>
              ))}
            </div>

            {/* Day columns */}
            {WEEK_DAYS.map((day, dayIndex) => {
              const dayAppointments = APPOINTMENTS.filter(
                (a) => a.day === dayIndex
              )
              return (
                <div
                  key={day.abbr}
                  className="flex-1 relative border-l border-zinc-200 dark:border-zinc-700"
                >
                  {/* Hour grid lines */}
                  {HOURS.map((hour) => (
                    <div
                      key={hour}
                      className="absolute left-0 right-0 border-t border-zinc-100 dark:border-zinc-800"
                      style={{
                        top: `${(hour - BUSINESS_START) * HOUR_HEIGHT}px`,
                      }}
                    />
                  ))}

                  {/* Appointments */}
                  {dayAppointments.map((appt, j) => (
                    <AppointmentBlock
                      key={j}
                      appointment={appt}
                      compact={compact}
                    />
                  ))}

                  {/* Current time indicator only on "today" (Qua) */}
                  {day.isToday && <CurrentTimeIndicator />}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
