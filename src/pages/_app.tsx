import type {AppProps} from 'next/app'
import {ChakraProvider} from "@chakra-ui/provider";
import {theme} from '@/chakra/theme';
import Layout from "@/components/Layout/Layout";
import {RecoilRoot} from "recoil";
import '../styles/globals.css';
import Link from "next/link";

export default function App({Component, pageProps}: AppProps) {
    return (
        <RecoilRoot>
            <ChakraProvider theme={theme}>
                <Layout>
                    <Component {...pageProps}/>
                </Layout>
            </ChakraProvider>
        </RecoilRoot>
    )
}
