import React from 'react';

import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';

interface LabelWithTooltipProps {
  id: string;
  text: string;
  help: React.ReactNode;
  hasTooltip?: boolean;
}
export default function LabelWithTooltip({
  text,
  help,
  id,
  hasTooltip = true,
}: LabelWithTooltipProps) {
  return (
    <>
      <Label className="text-xl font-semibold" htmlFor={id}>
        {text}
      </Label>
      {hasTooltip && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                aria-label="Change of author info tooltip"
              >
                <Icons.info />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{help}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
}
