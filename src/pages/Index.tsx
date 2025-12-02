import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [nickname, setNickname] = useState('');
  const [robuxAmount, setRobuxAmount] = useState('');
  const pricePerRobux = 0.9;

  const calculatePrice = () => {
    const amount = parseInt(robuxAmount) || 0;
    return (amount * pricePerRobux).toFixed(2);
  };

  const handlePayment = () => {
    if (!nickname || !robuxAmount) {
      alert('Пожалуйста, заполните все поля!');
      return;
    }
    alert(`Переход на оплату через ЮКассу...\nНик: ${nickname}\nКоличество робуксов: ${robuxAmount}\nСумма: ${calculatePrice()}₽`);
  };

  const features = [
    {
      icon: 'Zap',
      title: 'Мгновенная доставка',
      description: 'Робуксы поступят на ваш аккаунт в течение 5 минут после оплаты'
    },
    {
      icon: 'Shield',
      title: 'Безопасность',
      description: 'Все транзакции проходят через защищённую систему ЮКассы'
    },
    {
      icon: 'DollarSign',
      title: 'Выгодный курс',
      description: 'Лучший курс на рынке — всего 0.90₽ за 1 робукс'
    },
    {
      icon: 'Headphones',
      title: 'Поддержка 24/7',
      description: 'Наша команда всегда готова помочь решить любой вопрос'
    }
  ];

  const reviews = [
    {
      name: 'ProGamer2010',
      rating: 5,
      text: 'Быстро и надёжно! Робуксы пришли за 3 минуты. Буду заказывать ещё!',
      avatar: '🎮'
    },
    {
      name: 'MegaBuilder',
      rating: 5,
      text: 'Отличный сервис! Цены адекватные, поддержка отвечает моментально.',
      avatar: '🏗️'
    },
    {
      name: 'CoolKid777',
      rating: 5,
      text: 'Заказывал уже 5 раз, всё всегда приходит быстро. Рекомендую!',
      avatar: '⭐'
    },
    {
      name: 'RobloxFan',
      rating: 5,
      text: 'Самый лучший сервис для покупки робуксов! Безопасно и выгодно.',
      avatar: '💎'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 pointer-events-none" />
      
      <div className="relative z-10">
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full mb-6 neon-glow">
            <Icon name="Sparkles" size={20} className="text-primary" />
            <span className="text-sm font-medium text-primary">Надёжная покупка робуксов</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 neon-text bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-fade-in">
            ROBUX SHOP
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Мгновенная доставка робуксов по самому выгодному курсу. 
            Безопасно, быстро, надёжно.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-20">
            <div className="flex items-center gap-2 bg-card px-6 py-3 rounded-lg border border-primary/30">
              <Icon name="Users" size={20} className="text-primary" />
              <span className="font-semibold">10,000+ игроков</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-6 py-3 rounded-lg border border-primary/30">
              <Icon name="Star" size={20} className="text-secondary" />
              <span className="font-semibold">Рейтинг 4.9/5</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-6 py-3 rounded-lg border border-primary/30">
              <Icon name="Clock" size={20} className="text-primary" />
              <span className="font-semibold">Доставка 5 минут</span>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card/80 backdrop-blur border-primary/20 hover:border-primary/50 transition-all hover-scale hover:neon-glow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={feature.icon} size={24} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-20">
          <Card className="max-w-2xl mx-auto bg-card/90 backdrop-blur border-2 border-primary/30 neon-glow">
            <CardHeader className="text-center">
              <div className="inline-block mb-4">
                <div className="text-6xl mb-2">💰</div>
              </div>
              <CardTitle className="text-3xl font-bold neon-text">Калькулятор робуксов</CardTitle>
              <CardDescription className="text-base">
                Введите ваш игровой ник и количество робуксов для расчёта стоимости
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Icon name="User" size={16} className="text-primary" />
                  Игровой ник Roblox
                </label>
                <Input
                  type="text"
                  placeholder="Введите ваш ник"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="h-12 text-lg border-primary/30 focus:border-primary focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Icon name="Coins" size={16} className="text-primary" />
                  Количество робуксов
                </label>
                <Input
                  type="number"
                  placeholder="Введите количество"
                  value={robuxAmount}
                  onChange={(e) => setRobuxAmount(e.target.value)}
                  className="h-12 text-lg border-primary/30 focus:border-primary focus:ring-primary"
                  min="1"
                />
              </div>

              <div className="bg-primary/10 rounded-lg p-6 border border-primary/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Курс:</span>
                  <span className="font-semibold">1 Robux = 0.90₽</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">Итого:</span>
                  <span className="text-4xl font-bold text-primary neon-text">
                    {calculatePrice()}₽
                  </span>
                </div>
              </div>

              <Button 
                onClick={handlePayment}
                size="lg"
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all neon-glow"
              >
                <Icon name="CreditCard" size={24} className="mr-2" />
                Оплатить через ЮКассу
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Нажимая кнопку, вы соглашаетесь с условиями сервиса
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="container mx-auto px-4 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-text">
              Отзывы наших клиентов
            </h2>
            <p className="text-xl text-muted-foreground">
              Более 10,000 довольных игроков уже выбрали нас
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="bg-card/80 backdrop-blur border-primary/20 hover:border-secondary/50 transition-all hover-scale">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-4xl">{review.avatar}</div>
                    <div>
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <div className="flex gap-1 mt-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Icon key={i} name="Star" size={14} className="text-secondary fill-secondary" />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <footer className="container mx-auto px-4 py-12 border-t border-primary/20">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 neon-text">ROBUX SHOP</h3>
            <p className="text-muted-foreground mb-6">
              Безопасная покупка робуксов для Roblox
            </p>
            <div className="flex justify-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Условия использования</a>
              <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-primary transition-colors">Поддержка</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
