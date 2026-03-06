import { Helmet } from 'react-helmet-async';

import PipelineView from 'src/sections/dashboard/pipeline-view';


// ----------------------------------------------------------------------

export default function PipelinePage() {
  return (
    <>
      <Helmet>
        <title>Pipeline | Sales Dashboard</title>
      </Helmet>

      <PipelineView />
    </>
  );
}
