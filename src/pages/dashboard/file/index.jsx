import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { OrderSchdulingView } from 'src/sections/overview/file/view/order-scheduling-view';

// ----------------------------------------------------------------------

const metadata = { title: `File | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <OrderSchdulingView />
    </>
  );
}
