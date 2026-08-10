import LiveBiddingRoomClient from './LiveBiddingRoomClient';

type PageProps = {
  params: Promise<{ jobId: string }>;
};

export default async function LiveBiddingRoomPage({ params }: PageProps) {
  const { jobId } = await params;

  return <LiveBiddingRoomClient jobId={jobId} />;
}

export function generateStaticParams() {
  return [{ jobId: 'job-901' }];
}
