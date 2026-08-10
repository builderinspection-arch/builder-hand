import ContractorApprovalClient from './ContractorApprovalClient';

type PageProps = {
  params: Promise<{ contractorId: string }>;
};

export default async function AdminContractorApprovalPage({ params }: PageProps) {
  const { contractorId } = await params;

  return <ContractorApprovalClient contractorId={contractorId} />;
}

export function generateStaticParams() {
  return [{ contractorId: 'tradie-101' }];
}
