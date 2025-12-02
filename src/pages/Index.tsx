import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [nickname, setNickname] = useState('');
  const [robloxAvatar, setRobloxAvatar] = useState('');
  const [calculatorMode, setCalculatorMode] = useState<'robux' | 'rubles'>('robux');
  const [robuxAmount, setRobuxAmount] = useState('');
  const [rublesAmount, setRublesAmount] = useState('');
  const pricePerRobux = 0.9;

  const [newReview, setNewReview] = useState({ name: '', rating: 5, text: '' });
  const [userReviews, setUserReviews] = useState<Array<{ name: string; rating: number; text: string; avatar: string }>>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const savedReviews = localStorage.getItem('gplrobux_reviews');
    if (savedReviews) {
      setUserReviews(JSON.parse(savedReviews));
    }
  }, []);

  useEffect(() => {
    const fetchRobloxAvatar = async () => {
      const extractedNick = extractNickname(nickname);
      if (extractedNick && extractedNick.length >= 3) {
        try {
          const userResponse = await fetch(`https://users.roblox.com/v1/users/search?keyword=${extractedNick}&limit=1`);
          const userData = await userResponse.json();
          if (userData.data && userData.data[0]) {
            const userId = userData.data[0].id;
            const avatarResponse = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png`);
            const avatarData = await avatarResponse.json();
            if (avatarData.data && avatarData.data[0]) {
              setRobloxAvatar(avatarData.data[0].imageUrl);
            }
          } else {
            setRobloxAvatar('');
          }
        } catch (error) {
          setRobloxAvatar('');
        }
      } else {
        setRobloxAvatar('');
      }
    };

    const debounce = setTimeout(() => {
      fetchRobloxAvatar();
    }, 500);

    return () => clearTimeout(debounce);
  }, [nickname]);

  const extractNickname = (input: string) => {
    const atIndex = input.indexOf('@');
    if (atIndex === -1) return input;
    const afterAt = input.substring(atIndex + 1);
    return afterAt.length >= 8 ? afterAt.substring(0, 8) : afterAt;
  };

  const handleNicknameChange = (value: string) => {
    setNickname(value);
  };

  const handleRobuxChange = (value: string) => {
    setRobuxAmount(value);
    if (value) {
      const rubles = (parseFloat(value) * pricePerRobux).toFixed(2);
      setRublesAmount(rubles);
    } else {
      setRublesAmount('');
    }
  };

  const handleRublesChange = (value: string) => {
    setRublesAmount(value);
    if (value) {
      const robux = Math.floor(parseFloat(value) / pricePerRobux).toString();
      setRobuxAmount(robux);
    } else {
      setRobuxAmount('');
    }
  };

  const [paymentMethod, setPaymentMethod] = useState<'yukassa' | 'transfer' | 'sberbank'>('yukassa');

  const handlePayment = () => {
    const extractedNick = extractNickname(nickname);
    if (!extractedNick || extractedNick.length < 8 || !robuxAmount) {
      alert('Пожалуйста, заполните все поля! Ник должен содержать минимум 8 символов после @');
      return;
    }
    
    let paymentText = '';
    switch(paymentMethod) {
      case 'yukassa':
        paymentText = 'Переход на оплату через ЮКассу...';
        break;
      case 'transfer':
        paymentText = 'Реквизиты для перевода:\nКарта: 2202 2063 6855 0716\nПолучатель: Александр П.';
        break;
      case 'sberbank':
        paymentText = 'Оплата через СберБанк Онлайн:\nТелефон: +7 (999) 123-45-67\nИмя: Александр';
        break;
    }
    
    alert(`${paymentText}\n\nНик: ${extractedNick}\nКоличество робуксов: ${robuxAmount}\nСумма: ${rublesAmount}₽`);
  };

  const handleAddReview = () => {
    if (!newReview.name || !newReview.text) {
      alert('Пожалуйста, заполните все поля!');
      return;
    }
    const avatars = ['🎮', '🏗️', '⭐', '💎', '🎯', '🚀', '🔥', '⚡'];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    const updatedReviews = [...userReviews, { ...newReview, avatar: randomAvatar }];
    setUserReviews(updatedReviews);
    localStorage.setItem('gplrobux_reviews', JSON.stringify(updatedReviews));
    setNewReview({ name: '', rating: 5, text: '' });
    setIsDialogOpen(false);
  };

  const features = [
    {
      icon: 'Clock',
      title: 'Доставка 5-7 дней',
      description: 'Робуксы поступят на ваш аккаунт в течение 5-7 дней после оплаты'
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

  const defaultReviews = [
    {
      name: 'ProGamer2010',
      rating: 5,
      text: 'Быстро и надёжно! Робуксы пришли вовремя. Буду заказывать ещё!',
      avatar: '🎮'
    },
    {
      name: 'MegaBuilder',
      rating: 3,
      text: 'Сервис нормальный, но пришлось немного подождать. В целом доволен.',
      avatar: '🏗️'
    },
    {
      name: 'CoolKid777',
      rating: 5,
      text: 'Заказывал уже 5 раз, всё всегда приходит. Рекомендую!',
      avatar: '⭐'
    },
    {
      name: 'RobloxFan',
      rating: 2,
      text: 'Доставка заняла больше времени, чем ожидал. Поддержка помогла, но процесс долгий.',
      avatar: '💎'
    }
  ];

  const allReviews = [...defaultReviews, ...userReviews];

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 pointer-events-none" />
      
      <div className="relative z-10">
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full mb-6 neon-glow">
            <Icon name="Sparkles" size={20} className="text-primary" />
            <span className="text-sm font-medium text-primary">Надёжная покупка робуксов</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold mb-4 neon-text bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-fade-in">
            GPLrobux
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground/80 mb-6 italic">
            sammy разработчик роблокса
          </p>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Надёжная доставка робуксов по выгодному курсу. 
            Безопасно, проверено, надёжно.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-20">
            <div className="flex items-center gap-2 bg-card px-6 py-3 rounded-lg border border-primary/30">
              <Icon name="Users" size={20} className="text-primary" />
              <span className="font-semibold">10,000+ игроков</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-6 py-3 rounded-lg border border-primary/30">
              <Icon name="Star" size={20} className="text-secondary" />
              <span className="font-semibold">Рейтинг 4.6/5</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-6 py-3 rounded-lg border border-primary/30">
              <Icon name="Clock" size={20} className="text-primary" />
              <span className="font-semibold">Доставка 5-7 дней</span>
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
                Введите ваш игровой ник и сумму для расчёта
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Icon name="User" size={16} className="text-primary" />
                  Игровой ник Roblox
                </label>
                <div className="flex gap-3 items-center">
                  <Input
                    type="text"
                    placeholder="@ваш_ник или просто ник"
                    value={nickname}
                    onChange={(e) => handleNicknameChange(e.target.value)}
                    className="h-12 text-lg border-primary/30 focus:border-primary focus:ring-primary flex-1"
                  />
                  {robloxAvatar && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-primary neon-glow">
                      <img src={robloxAvatar} alt="Roblox Avatar" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                {nickname && (
                  <p className="text-xs text-muted-foreground">
                    Будет использован: {extractNickname(nickname)}
                  </p>
                )}
              </div>

              <div className="flex gap-2 bg-muted p-1 rounded-lg">
                <Button
                  variant={calculatorMode === 'robux' ? 'default' : 'ghost'}
                  onClick={() => setCalculatorMode('robux')}
                  className="flex-1"
                >
                  Робуксы → Рубли
                </Button>
                <Button
                  variant={calculatorMode === 'rubles' ? 'default' : 'ghost'}
                  onClick={() => setCalculatorMode('rubles')}
                  className="flex-1"
                >
                  Рубли → Робуксы
                </Button>
              </div>

              {calculatorMode === 'robux' ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Icon name="Coins" size={16} className="text-primary" />
                    Количество робуксов
                  </label>
                  <Input
                    type="number"
                    placeholder="Введите количество робуксов"
                    value={robuxAmount}
                    onChange={(e) => handleRobuxChange(e.target.value)}
                    className="h-12 text-lg border-primary/30 focus:border-primary focus:ring-primary"
                    min="1"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Icon name="Wallet" size={16} className="text-primary" />
                    Сумма в рублях
                  </label>
                  <Input
                    type="number"
                    placeholder="Введите сумму в рублях"
                    value={rublesAmount}
                    onChange={(e) => handleRublesChange(e.target.value)}
                    className="h-12 text-lg border-primary/30 focus:border-primary focus:ring-primary"
                    min="1"
                    step="0.01"
                  />
                </div>
              )}

              <div className="bg-primary/10 rounded-lg p-6 border border-primary/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Вы получите:</p>
                    <p className="text-3xl font-bold text-primary neon-text">
                      {robuxAmount || '0'} Robux
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">К оплате:</p>
                    <p className="text-3xl font-bold text-secondary neon-text">
                      {rublesAmount || '0'}₽
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Способ оплаты:</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Card
                    onClick={() => setPaymentMethod('yukassa')}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      paymentMethod === 'yukassa' 
                        ? 'border-primary bg-primary/10 neon-glow' 
                        : 'border-primary/20 bg-card/50'
                    }`}
                  >
                    <CardContent className="p-4 flex flex-col items-center gap-2">
                      <Icon name="CreditCard" size={32} className="text-primary" />
                      <span className="font-semibold text-sm">ЮКасса</span>
                      <span className="text-xs text-muted-foreground text-center">Карты, СБП</span>
                    </CardContent>
                  </Card>

                  <Card
                    onClick={() => setPaymentMethod('transfer')}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      paymentMethod === 'transfer' 
                        ? 'border-primary bg-primary/10 neon-glow' 
                        : 'border-primary/20 bg-card/50'
                    }`}
                  >
                    <CardContent className="p-4 flex flex-col items-center gap-2">
                      <Icon name="ArrowRightLeft" size={32} className="text-primary" />
                      <span className="font-semibold text-sm">Перевод</span>
                      <span className="text-xs text-muted-foreground text-center">На карту</span>
                    </CardContent>
                  </Card>

                  <Card
                    onClick={() => setPaymentMethod('sberbank')}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      paymentMethod === 'sberbank' 
                        ? 'border-primary bg-primary/10 neon-glow' 
                        : 'border-primary/20 bg-card/50'
                    }`}
                  >
                    <CardContent className="p-4 flex flex-col items-center gap-2">
                      <Icon name="Building2" size={32} className="text-primary" />
                      <span className="font-semibold text-sm">СберБанк</span>
                      <span className="text-xs text-muted-foreground text-center">Онлайн</span>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Button 
                onClick={handlePayment}
                size="lg"
                className="w-full h-14 text-lg font-semibold gradient-purple-blue hover:opacity-90 transition-all neon-glow"
              >
                <Icon name={paymentMethod === 'yukassa' ? 'CreditCard' : paymentMethod === 'transfer' ? 'ArrowRightLeft' : 'Building2'} size={24} className="mr-2" />
                {paymentMethod === 'yukassa' ? 'Оплатить через ЮКассу' : paymentMethod === 'transfer' ? 'Получить реквизиты' : 'Оплатить через СберБанк'}
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
            <p className="text-xl text-muted-foreground mb-6">
              Более 10,000 довольных игроков уже выбрали нас
            </p>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="border-primary/30 hover:border-primary neon-glow">
                  <Icon name="MessageSquarePlus" size={20} className="mr-2" />
                  Оставить отзыв
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-primary/30">
                <DialogHeader>
                  <DialogTitle className="text-2xl neon-text">Оставьте свой отзыв</DialogTitle>
                  <DialogDescription>
                    Поделитесь своим опытом использования GPLrobux
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ваше имя</label>
                    <Input
                      placeholder="Введите имя"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="border-primary/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Оценка</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="transition-transform hover:scale-110"
                        >
                          <Icon
                            name="Star"
                            size={32}
                            className={star <= newReview.rating ? 'text-secondary fill-secondary' : 'text-muted-foreground'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ваш отзыв</label>
                    <Textarea
                      placeholder="Расскажите о своём опыте..."
                      value={newReview.text}
                      onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                      className="border-primary/30 min-h-[100px]"
                    />
                  </div>
                  <Button onClick={handleAddReview} className="w-full gradient-purple-blue neon-glow">
                    <Icon name="Send" size={18} className="mr-2" />
                    Отправить отзыв
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allReviews.map((review, index) => (
              <Card key={index} className="bg-card/80 backdrop-blur border-primary/20 hover:border-secondary/50 transition-all hover-scale">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-4xl">{review.avatar}</div>
                    <div>
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <div className="flex gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={14}
                            className={i < review.rating ? 'text-secondary fill-secondary' : 'text-muted-foreground'}
                          />
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
            <h3 className="text-2xl font-bold mb-4 neon-text">GPLrobux</h3>
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