
import styles from './ButtonSubscribe.module.scss';
import {useSession, signIn} from 'next-auth/client';
import { api } from '../../services/api';
import { getStripeJS } from '../../services/stripe-js';


interface ButtonSubscribeProps{
    priceId: string,
}
export function ButtonSubscribe({priceId} : ButtonSubscribeProps){
    const [ session ] = useSession();
    async function handleSubscribe() {
        if(!session) {
            signIn('github')
            return; 
        }

        try {
            const response = await api.post('/subscribe');

            const {sessionId} = response.data;

            const stripe = await getStripeJS()

            await stripe.redirectToCheckout({sessionId})
        }catch(err) {
            alert(err.message);
        }


        //criação de checkout session
    }
    return (
    <button  type="button" className={styles.button} onClick={handleSubscribe}>
        Subscribe Now
    </button>
    );
}