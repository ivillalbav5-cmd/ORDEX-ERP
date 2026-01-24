import React from 'react';

interface PageHeaderProps {
    title: string;
    description?: React.ReactNode;
    actions?: React.ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-brand bg-clip-text text-transparent font-heading tracking-tight w-fit inline-block pr-1 pb-1 leading-tight">{title}</h1>
                {description && (
                    <div className="flex flex-wrap items-center gap-2">
                        {typeof description === 'string' ? (
                            <p className="text-muted-foreground mt-1">{description}</p>
                        ) : (
                            description
                        )}
                    </div>
                )}
            </div>
            {actions && (
                <div className="flex items-center gap-3">
                    {actions}
                </div>
            )}
        </div>
    );
}
