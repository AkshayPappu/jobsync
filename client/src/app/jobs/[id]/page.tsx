import DefaultLayout from "../../../components/Layouts/DefaultLayout";

export default function JobPage({ params }: { params: { id: string } }) {
    return (
        <DefaultLayout>
            <h1>{params.id}</h1>
        </DefaultLayout>
    );
  }  