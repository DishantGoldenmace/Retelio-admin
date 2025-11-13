import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { _orders } from 'src/_mock/_order';

import { PostListView } from 'src/sections/blog/view';
// ----------------------------------------------------------------------

const metadata = { title: `Post list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { id = '' } = useParams();

  const currentOrder = _orders[5];

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PostListView order={currentOrder} />
    </>
  );
}
