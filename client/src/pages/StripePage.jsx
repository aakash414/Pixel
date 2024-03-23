import {loadStripeOnramp} from '@stripe/crypto';

import {CryptoElements, OnrampElement} from '../components/StripeCryptoElements';

const stripeOnrampPromise = loadStripeOnramp("pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3");

export default () => {
  // IMPORTANT: replace with your logic of how to mint/retrieve client secret
  const clientSecret = "cos_1Lb6vsAY1pjOSNXVWF3nUtkV_secret_8fuPvTzBaxj3XRh14C6tqvdl600rpW7hG4G";

  return (
    <div className='h-full'>
        <CryptoElements stripeOnramp={stripeOnrampPromise}>
        <OnrampElement clientSecret={clientSecret} />
        </CryptoElements>
    </div>
  );
}