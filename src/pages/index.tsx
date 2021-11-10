import Head from "next/head";
import { GetStaticProps } from "next";
import {ButtonSubscribe} from "../components/ButtonSubscribe/ButtonSubscribe";
import styles from './home.module.scss';
import { stripe } from "../services/stripe";

interface HomeProps {
  product:{
    priceId:string,
    amount: number,
  }
}

//client-side -> conteudo gerado e reavalidado no navegador. ações dos usuários, como comentários em tempo real.
//server side -> todo conteúdo da página é gerado em um servidor node e não no navegador, js não é comprometido. dados dinamicos.
//static side generation -> html estatico salvo no servidor node e revalida (consome api novamente) conforme a necessidade. identicas para todos.

export default function Home( {product} : HomeProps) {

  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
        <span> 👏 Hey, welcome</span>
        <h1>News about the <span>React</span> world</h1>
        <p>
          Get access to all the publications <br />
          <span>for {product.amount} month</span>
        </p>
        <ButtonSubscribe priceId={product.priceId}/>
        </section>
        <img src="/images/avatar.svg" alt="Girl coding"/>
      </main>
    </>
  );
}

export const getStaticProps : GetStaticProps= async () => { 
  const price = await stripe.prices.retrieve('price_1JtvsgAqkL1WW6EwDIe89pWu', {
    expand: ['product'], //todas infos do produto
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
    }).format(price.unit_amount/100), //vem sempre em centavos
  }  
  return {
    props: {
      product: product,
    },
    revalidate: 60 * 60 * 24, //24horas
  }
}