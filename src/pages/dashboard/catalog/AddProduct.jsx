import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import AddNewProduct from 'src/sections/catalog/AddNewProduct';

// ----------------------------------------------------------------------

const metadata = { title: `Add New Product | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <h1>New Product</h1>

      <AddNewProduct />
    </>
  );
}
