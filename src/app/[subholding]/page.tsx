import SubholdingClient from "./SubholdingClient";

export function generateStaticParams() {
  return [
    { subholding: "sh-upstream" },
    { subholding: "sh-downstream" },
    { subholding: "sh-pnre" },
    { subholding: "sh-gas" },
  ];
}

export default function SubholdingPage({ params }: { params: { subholding: string } }) {
  return <SubholdingClient slug={params.subholding} />;
}
