// import { Helmet } from "react-helmet-async";
// sections
import { CarListView } from "../sections/car/view";

// ----------------------------------------------------------------------

export const metadata = {
  title: "Car List | Desol Int.",
};

export default function CarListPage() {
  return (
    <>
      <CarListView />
    </>
  );
}
