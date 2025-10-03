import { Helmet } from 'react-helmet-async';

import RcmPage from 'src/sections/rcm_monitoring/rcm-view';


// ----------------------------------------------------------------------

export default function Rcm() {
    return (
        <>
            <Helmet>
                <title> RCM Monitoring Dashboard </title>
            </Helmet>

            <RcmPage />
        </>
    );
}
