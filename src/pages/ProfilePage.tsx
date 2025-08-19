import { useEffect } from 'preact/hooks';
import { useAuthSignals } from '@services/AuthSignals';
import { usePageTranslations } from '@services/i18n';
import { Container } from '@components/layout/Container/Container';
import { Card } from '@components/display/Card';
import { Button } from '@components/form/Button';
import { Loading } from '@components/feedback/Loading';
import {
  auth0State,
  loginWithRedirect,
  logout as auth0Logout,
} from '@services/Auth0Provider';

export function ProfilePage() {
  const { user } = useAuthSignals();
  const t = usePageTranslations('profile');

  useEffect(() => {
    // Detaliczne logowanie procesu ładowania
    console.log('ProfilePage: Sprawdzanie stanu autoryzacji...');
    console.log(
      'Auth0State isAuthenticated:',
      auth0State.value.isAuthenticated
    );
    console.log('Auth0State user:', auth0State.value.user);

    if (auth0State.value.isAuthenticated) {
      console.log('ProfilePage: Użytkownik zalogowany, ładowanie profilu...');
      console.log('Dane użytkownika:', auth0State.value.user);
    } else {
      console.log('ProfilePage: Użytkownik niezalogowany');
    }
  }, [auth0State.value.isAuthenticated]);

  const handleLogin = () => {
    // Użyj globalnego loginu z Auth0Provider
    loginWithRedirect();
  };

  const handleLogout = () => {
    // Użyj globalnego logoutu z Auth0Provider
    auth0Logout();
  };

  const userData = auth0State.value.user || user.value;
  const isLoggedIn = auth0State.value.isAuthenticated;

  return (
    <Container>
      <h1 className="text-3xl font-bold text-text-primary mb-6">
        {t('title')}
      </h1>

      <Card>
        <div className="p-6">
          {!isLoggedIn ? (
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                {t('notLoggedIn')}
              </h2>
              <p className="text-text-muted mb-6">{t('loginToViewProfile')}</p>
              <Button onClick={handleLogin} variant="primary">
                {t('login')}
              </Button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                {t('userInfo')}
              </h2>

              {userData ? (
                <div className="space-y-4">
                  {userData.picture && (
                    <div>
                      <img
                        src={userData.picture}
                        alt={t('picture')}
                        className="w-20 h-20 rounded-full"
                      />
                    </div>
                  )}

                  <div>
                    <strong className="text-text-primary">{t('name')}:</strong>
                    <span className="text-text-muted ml-2">
                      {userData.name || 'N/A'}
                    </span>
                  </div>

                  <div>
                    <strong className="text-text-primary">{t('email')}:</strong>
                    <span className="text-text-muted ml-2">
                      {userData.email || 'N/A'}
                    </span>
                  </div>

                  <div>
                    <strong className="text-text-primary">
                      {t('nickname')}:
                    </strong>
                    <span className="text-text-muted ml-2">
                      {userData.nickname || 'N/A'}
                    </span>
                  </div>

                  <div>
                    <strong className="text-text-primary">
                      {t('emailVerified')}:
                    </strong>
                    <span className="text-text-muted ml-2">
                      {userData.email_verified ? t('yes') : t('no')}
                    </span>
                  </div>

                  <div>
                    <strong className="text-text-primary">{t('sub')}:</strong>
                    <span className="text-text-muted ml-2 text-sm">
                      {userData.sub || 'N/A'}
                    </span>
                  </div>

                  <div>
                    <strong className="text-text-primary">
                      {t('updatedAt')}:
                    </strong>
                    <span className="text-text-muted ml-2">
                      {userData.updated_at
                        ? new Date(userData.updated_at).toLocaleString()
                        : 'N/A'}
                    </span>
                  </div>

                  <div className="pt-4">
                    <Button onClick={handleLogout} variant="secondary">
                      {t('logout')}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Loading />
                  <p className="text-text-muted mt-4">{t('loading')}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </Container>
  );
}
