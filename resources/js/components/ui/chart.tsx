"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
    color?: string
  }
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"]
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        className={cn(
          "flex justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-polar-angle-axis-tick_text]:fill-muted-foreground [&_.recharts-radial-bar-background-sector]:fill-muted/40 [&_.recharts-sector:focus-visible]:outline-hidden [&_.recharts-sector]:outline-hidden",
          className,
        )}
        style={
          Object.fromEntries(
            Object.entries(config).map(([key, value]) => [
              `--color-${key}`,
              value.color,
            ]),
          ) as React.CSSProperties
        }
        {...props}
      >
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

function ChartTooltipContent({
  active,
  payload,
  className,
  hideLabel = false,
}: React.ComponentProps<"div"> & {
  active?: boolean
  payload?: ReadonlyArray<{
    dataKey?: string
    name?: string
    value?: number | string
    color?: string
  }>
  hideLabel?: boolean
}) {
  const { config } = useChart()

  if (!active || !payload?.length) {
    return null
  }

  return (
    <div
      className={cn(
        "grid min-w-32 gap-2 rounded-lg border bg-background px-3 py-2 text-xs shadow-md",
        className,
      )}
    >
      {payload.map((item) => {
        const key = String(item.dataKey ?? item.name ?? "")
        const itemConfig = config[key]

        return (
          <div
            className="flex items-center justify-between gap-3"
            key={key}
          >
            <div className="flex items-center gap-2">
              <span
                className="size-2.5 rounded-full"
                style={{
                  backgroundColor: item.color ?? itemConfig?.color,
                }}
              />
              {!hideLabel && (
                <span className="text-muted-foreground">
                  {itemConfig?.label ?? item.name}
                </span>
              )}
            </div>
            <span className="font-medium text-foreground">
              {typeof item.value === "number"
                ? item.value.toLocaleString()
                : item.value}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export { ChartContainer, ChartTooltip, ChartTooltipContent }
