import { LayoutGrid } from "@/components/layout-grid";
import { Layout } from "@/components/layout";
import Link from "next/link";
import Image from "next/image";

export default function Portofolio({ data }) {
  return (
    <Layout
      className=" font-poppins"
      meta={{
        title: "Portofolio",
        description: "Portofolio",
        path: "/Portofolio",
      }}
    >
      <section className="   font-poppins">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className=" lg:py-6  lg:w-1/2 lg:pr-12 lg:text-left text-center">
            <div className="flex-grow flex flex-col justify-center h-full ">
              <h2 className="text-3xl font-semibold text-blue-600 relative">
                _ Portfolio
              </h2>
              <p
                className="text-5xl md:text-7xl font-semibold leading-tight"
                mt="4"
                mb="0"
              >
                Hello, My
                <br />
                Name's Mohamed.
                <br />
                I'm a Front-end
                <br />
                Developer
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 w-full mt-10 mb-10 lg:mb-0 rounded-lg overflow-hidden">
            <Image
              alt="hero image"
              className="object-cover object-center h-full w-full  rounded-lg "
              src={`/images/hero.png`}
              width={1650}
              height={1300}
            />
          </div>
        </div>
      </section>

      <div className=" py-24 font-poppins">
        <div className="  text-center lg:text-left lg:ml-28 mb-24">
          <div className="container mx-auto ">
            <h1 className="text-3xl font-bold text-blue-600  relative  ">
              _ Projects
            </h1>
            <p
              className="text-5xl md:text-7xl font-semibold leading-tight"
              mt="4"
              mb="0"
            >
              Look at My
              <br />
              Products.
            </p>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center">
            {data.map((proj) => (
              <Link
                key={proj.id}
                href="/projects/[id]"
                as={`/projects/${proj.id}`}
              >
                <div className=" sm:w-full lg:w-1/2 max-w-2xl mx-4 my-8 text-center bg-white rounded-lg  cursor-pointer shadow-md hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out">
                  <div className="relative group ">
                    <img
                      key={proj.img}
                      src={proj.img}
                      width={1000}
                      className="mx-auto rounded-t-lg ascpect-w-1 object-cover w-full "
                    />
                    <div className="box group-hover:opacity-100 text-4xl font-bold">
                      check <br /> out
                    </div>
                  </div>
                  <div className="product-info p-10 text-left">
                    <h3 variant="heading.h2" className="mt-4 mb-2">
                      {proj.title}
                    </h3>
                    <span
                      variant=""
                      className="text-gray-600 text-xl leading-normal"
                    >
                      {proj.techUsed}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(
//     "https://my-json-server.typicode.com/mohamedhadia/jsonAPI/projects"
//   );
//   const projects = await res.json();
//   const paths = projects.map((proj) => ({
//     params: { id: proj.id },
//   }));

//   return { paths, fallback: false };
// }

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://my-json-server.typicode.com/mohamedhadia/jsonAPI/projects/`
  );
  const data = await res.json();

  return {
    props: { data },
  };
}
