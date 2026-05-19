'use client';

import { TrendingUp } from 'lucide-react';
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';

type DashboardRadialStackedChartProps = {
    title: string;
    description: string;
    centerLabel: string;
    items: [
        { key: string; label: string; value: number },
        { key: string; label: string; value: number },
        { key: string; label: string; value: number },
    ];
    footerHighlight: string;
    footerDescription: string;
};

export function DashboardRadialStackedChart({
    title,
    description,
    centerLabel,
    items,
    footerHighlight,
    footerDescription,
}: DashboardRadialStackedChartProps) {
    const chartData = [
        items.reduce<Record<string, number | string>>(
            (carry, item) => {
                carry[item.key] = item.value;

                return carry;
            },
            { segment: 'overview' },
        ),
    ];

    const chartColors = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)'];

    const chartConfig = Object.fromEntries(
        items.map((item, index) => [
            item.key,
            {
                label: item.label,
                color: chartColors[index],
            },
        ]),
    ) satisfies ChartConfig;

    const total = items.reduce((sum, item) => sum + item.value, 0);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0 text-center">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[260px]"
                >
                    <RadialBarChart
                        data={chartData}
                        endAngle={180}
                        innerRadius={80}
                        outerRadius={112}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        {items.map((item) => (
                            <RadialBar
                                key={item.key}
                                dataKey={item.key}
                                stackId="a"
                                cornerRadius={5}
                                fill={`var(--color-${item.key})`}
                                className="stroke-transparent stroke-2"
                            />
                        ))}
                        <PolarRadiusAxis
                            tick={false}
                            tickLine={false}
                            axisLine={false}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        'cx' in viewBox &&
                                        'cy' in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) - 16}
                                                    className="fill-foreground text-2xl font-bold"
                                                >
                                                    {total.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 4}
                                                    className="fill-muted-foreground"
                                                >
                                                    {centerLabel}
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex flex-wrap justify-center gap-3">
                    {items.map((item) => (
                        <div
                            key={item.key}
                            className="flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs"
                        >
                            <span
                                className="size-2.5 rounded-full"
                                style={{
                                    backgroundColor:
                                        chartConfig[item.key].color,
                                }}
                            />
                            <span className="text-muted-foreground">
                                {item.label}
                            </span>
                            <span className="font-medium text-foreground">
                                {item.value.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-2 leading-none font-medium">
                    {footerHighlight} <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    {footerDescription}
                </div>
            </CardFooter>
        </Card>
    );
}
