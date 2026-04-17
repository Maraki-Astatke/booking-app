import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'am' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
  };

  return (
    <Button 
      onClick={toggleLanguage}
      variant="outline" 
      className="rounded-xl"
    >
      {i18n.language === 'en' ? 'አማርኛ' : 'English'}
    </Button>
  );
};

export default LanguageSwitcher;