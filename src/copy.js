export const copy = Object.freeze({
  nav: {
    newTask: 'New task',
    assistant: 'Assistant',
    docs: 'Docs',
    slides: 'Slides',
    plans: 'Plans',
    productHomeA11y: 'Product home',
    productNavA11y: 'Product navigation',
  },
  account: {
    name: 'Alex Morgan',
    initialPlan: 'Free',
    proPlan: 'Pro',
  },
  page: {
    title: 'Plans & pricing',
    description: 'Choose the plan that fits how you work. All plans include AI chat, document generation, and Slides.',
    support: 'Upgrade for more monthly credits and advanced capabilities.',
    comparisonA11y: 'Plan comparison',
  },
  priceUnit: '/ month',
  states: {
    current: 'Your current plan',
    recommended: 'Recommended',
  },
  actions: {
    upgradePro: 'Upgrade to Pro',
    processingPro: 'Upgrading to Pro…',
    upgradeUltra: 'Upgrade to Ultra',
  },
  plans: {
    free: {
      name: 'Free',
      description: 'Essential AI tools for getting started.',
      price: '$0',
      group: 'Includes:',
      features: [
        '1,000 credits every month',
        'AI chat for everyday questions and tasks',
        'Create and refine documents',
        'Create presentations with Slides',
      ],
    },
    pro: {
      name: 'Pro',
      description: 'More capacity and advanced models for regular work.',
      price: '$12',
      group: 'Everything in Free, plus:',
      features: [
        '20,000 credits every month',
        'Access to advanced models',
      ],
    },
    ultra: {
      name: 'Ultra',
      description: 'More capacity with priority task processing.',
      price: '$30',
      group: 'Everything in Pro, plus:',
      features: [
        '60,000 credits every month',
        'Priority processing for your tasks',
      ],
    },
  },
  creditHelp: 'Credits are used across AI chat, document generation, and Slides.',
  terms: [
    'Paid plans renew automatically every month.',
    'Cancel anytime.',
    'New benefits are available as soon as your subscription is confirmed.',
  ],
  termsA11y: 'Subscription terms',
  modal: {
    title: 'Welcome to Pro',
    description: 'Your plan is now active. You can use your Pro benefits immediately.',
    group: 'Included with Pro',
    benefits: [
      '20,000 credits every month',
      'Access to advanced models',
      'AI chat, document generation, and Slides',
    ],
    primary: 'Start using Pro',
    closeA11y: 'Close Pro confirmation',
  },
});
