
import {cookies} from 'next/headers';
import CookieUi from '../client/CookieUi';

export default function Cookie() {

    const authToken = cookies().get('userSession')?.value || '';

    
    return <CookieUi cookie={authToken}/>;
}