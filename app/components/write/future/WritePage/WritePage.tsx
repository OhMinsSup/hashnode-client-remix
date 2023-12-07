import { WriteContent } from "~/components/write/future/WriteContent";
import { WriteHead } from "~/components/write/future/WriteHead";
import { WriteHeader } from "~/components/write/future/WriteHeader";
import { WriteLeftHeader } from "~/components/write/future/WriteLeftHeader";
import { WriteRightHeader } from "~/components/write/future/WriteRightHeader";
import { WritePublishDrawer } from "~/components/write/future/WritePublishDrawer";
import { WriteFormProvider } from "~/components/write/context/form";

import type { SerializeFrom } from "@remix-run/cloudflare";

interface WritePageProps {
  initialValues?: SerializeFrom<FetchRespSchema.PostDetailResp>;
}

export default function WritePage({ initialValues }: WritePageProps) {
  return (
    <WriteFormProvider initialValues={initialValues}>
      <WriteHeader left={<WriteLeftHeader />} right={<WriteRightHeader />} />
      <WriteContent header={<WriteHead />} drawer={<WritePublishDrawer />} />
    </WriteFormProvider>
  );
}
