import React from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
type PricingCardProps = {
  plan: string;
  price: string;
  features: string[];
  cta: string;
  popular?: boolean;
  onSelect: () => void;
};
export function PricingCard({ plan, price, features, cta, popular = false, onSelect }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={cn('h-full', popular && 'relative')}
    >
      <Card className={cn('flex flex-col h-full rounded-2xl shadow-soft', popular ? 'border-2 border-primary' : '')}>
        {popular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
              MOST POPULAR
            </div>
          </div>
        )}
        <CardHeader className="text-center pt-12">
          <CardTitle className="text-2xl font-display font-bold">{plan}</CardTitle>
          <p className="text-center my-4">
            <span className="text-5xl font-extrabold">${price}</span>
            <span className="text-muted-foreground">/mo</span>
          </p>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow p-6 pt-0">
          <Button
            onClick={onSelect}
            className={cn('w-full text-lg py-6 font-semibold transition-all duration-300', popular ? 'btn-gradient' : '')}
            variant={popular ? 'default' : 'outline'}
          >
            {cta}
          </Button>
          <ul className="mt-8 space-y-4 text-muted-foreground flex-grow">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}