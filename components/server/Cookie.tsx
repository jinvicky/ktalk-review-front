
import {cookies} from 'next/headers';
import CookieUi from '../client/CookieUi';

export default function Cookie() {

    const authToken = cookies().get('auth_token')?.value || '';
    return <CookieUi cookie={authToken} />;
}