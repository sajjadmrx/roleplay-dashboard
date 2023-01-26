import axios from 'axios';

interface Proxy {
    ip: string;
    port: number;
}
export async function fetchProxy(): Promise<Proxy | null> {
    const url = 'https://proxylist.geonode.com/api/proxy-list'
    try {
        const result = await axios.get(url);
        const items = result.data;
        const listProxy = items.data;

        const proxys = listProxy.filter((a: any) => a.country != 'IR')
        if (!proxys) return null;
        const proxy = proxys[Math.floor(Math.random() * proxys.length)];
        return {
            ip: proxy.ip,
            port: proxy.port,
        }
    } catch (error) {
        throw error
    }
}