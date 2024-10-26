import { useEffect, useCallback } from 'react';

declare global {
  interface Window {
    FB: {
      init: (params: {
        appId: string;
        cookie: boolean;
        xfbml: boolean;
        version: string;
      }) => void;
      login: (callback: (response: any) => void, params: { scope: string }) => void;
    };
    fbAsyncInit: () => void; // Add fbAsyncInit here
  }
}

export const useFacebookLogin = (
  appId: string,
  onSuccess: (token: string) => void,
  onError: (error: string) => void
) => {
  useEffect(() => {
    // Load Facebook SDK
    const loadFacebookSDK = () => {
      if (document.getElementById('facebook-jssdk')) return;

      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;

      document.body.appendChild(script);

      // Set fbAsyncInit on the window object
      window.fbAsyncInit = () => {
        window.FB.init({
          appId,
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        });
      };
    };

    loadFacebookSDK();
  }, [appId]);

  const handleFacebookLogin = useCallback(() => {
    if (!window.FB) {
      onError('Facebook SDK not loaded');
      return;
    }

    window.FB.login((response) => {
      if (response.authResponse) {
        onSuccess(response.authResponse.accessToken);
      } else {
        onError('Facebook login failed');
      }
    }, { scope: 'email,public_profile' });
  }, [onSuccess, onError]);

  return handleFacebookLogin;
};
