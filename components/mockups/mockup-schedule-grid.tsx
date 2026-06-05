import { cn } from "@/lib/utils"
import {
  APPOINTMENTS,
  BUSINESS_END,
  BUSINESS_START,
  STATUS_COLORS,
  STATUS_LABELS,
  WEEK_DAYS,
  type MockAppointment,
} from "./mockup-data"

const HOUR_HEIGHT = 50
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
  const isTiny = height < 35
  const showBadge = !compact && height >= HOUR_HEIGHT * 1.2

  return (
    <div
      className="absolute left-0.5 right-0.5 rounded shadow-sm overflow-hidden bg-white/90 dark:bg-zinc-800/90"
      style={{
        top: `${top}px`,
        height: `${height}px`,
        borderLeft: `3px solid ${color}`,
      }}
    >
      <div className="px-1.5 py-1">
        {isTiny ? (
          <div
            className="truncate font-semibold text-zinc-700 dark:text-zinc-200 text-center"
            style={{ fontSize: compact ? "9px" : "10px", lineHeight: "1.3" }}
          >
            {appointment.client.split(" ")[0]}
          </div>
        ) : (
          <>
            <div
              className="truncate font-semibold text-zinc-700 dark:text-zinc-200"
              style={{ fontSize: compact ? "10px" : "12px", lineHeight: "1.3" }}
            >
              {appointment.client}
            </div>
            {height >= HOUR_HEIGHT && (
              <div
                className="truncate text-zinc-500 dark:text-zinc-400"
                style={{ fontSize: "10px", lineHeight: "1.3" }}
              >
                {appointment.service}
              </div>
            )}
            {showBadge && (
              <div className="mt-0.5">
                <span
                  className="inline-block text-[9px] font-medium px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: `${color}15`,
                    color: color,
                  }}
                >
                  {STATUS_LABELS[appointment.status]}
                </span>
              </div>
            )}
          </>
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
        <div className="w-2.5 h-2.5 rounded-full bg-red-500 -ml-1 flex-shrink-0" />
        <div className="flex-1 h-0.5 bg-red-500" />
      </div>
    </div>
  )
}

export function MockupScheduleGrid({ variant = "hero" }: { variant?: "hero" | "compact" }) {
  const compact = variant === "compact"
  const totalHeight = HOURS.length * HOUR_HEIGHT
  const timeColWidth = compact ? 36 : 44

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
          <div className="flex-shrink-0" style={{ width: `${timeColWidth}px` }} />
          {WEEK_DAYS.map((day) => (
            <div
              key={day.abbr}
              className={cn(
                "flex-1 text-center py-2 border-l border-zinc-200 dark:border-zinc-700",
                day.isToday && "bg-primary/5 dark:bg-primary/10"
              )}
            >
              <div
                className={cn(
                  "font-medium uppercase tracking-wide",
                  day.isToday
                    ? "text-primary"
                    : "text-zinc-500 dark:text-zinc-400"
                )}
                style={{ fontSize: "11px" }}
              >
                {day.abbr}
              </div>
              <div className="flex items-center justify-center mt-0.5">
                {day.isToday ? (
                  <span
                    className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white font-bold"
                    style={{ fontSize: "12px" }}
                  >
                    {day.num}
                  </span>
                ) : (
                  <span
                    className="text-zinc-700 dark:text-zinc-300 font-semibold"
                    style={{ fontSize: "13px" }}
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
              style={{ width: `${timeColWidth}px` }}
            >
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  className="absolute right-1.5 text-zinc-400 dark:text-zinc-500 font-medium tabular-nums"
                  style={{
                    top: `${(hour - BUSINESS_START) * HOUR_HEIGHT}px`,
                    fontSize: "10px",
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
                  className={cn(
                    "flex-1 relative border-l border-zinc-200 dark:border-zinc-700",
                    day.isToday && "bg-primary/[0.03] dark:bg-primary/[0.05]"
                  )}
                >
                  {/* Hour grid lines */}
                  {HOURS.map((hour) => (
                    <div
                      key={hour}
                      className="absolute left-0 right-0 border-t border-zinc-200/70 dark:border-zinc-700/70"
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
