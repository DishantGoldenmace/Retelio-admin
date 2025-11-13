import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import CatalogList from 'src/sections/catalog/CatalogList';

// ----------------------------------------------------------------------

const metadata = { title: `Catalog List | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <h1>Helloae</h1>

      <CatalogList />
    </>
  );
}
