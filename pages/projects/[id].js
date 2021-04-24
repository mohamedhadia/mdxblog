import { Layout } from "@/components/layout";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap/dist/gsap";
import { TimelineLite, Power2 } from "gsap";
import { CSSRulePlugin } from "gsap/dist/CSSRulePlugin";
gsap.registerPlugin(CSSRulePlugin);

let easing = [0.6, -0.05, 0.01, 0.99];

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

export default function Portofolio({ data }) {
  let image = useRef(null);
  let container = useRef(null);
  let tl = new TimelineLite();
  // const myPlugins = [CSSRulePlugin];

  useEffect(() => {
    let imageReveal = CSSRulePlugin.getRule(".img-containerz:after");
    tl.to(container, 0, { css: { visibility: "visible" } });
    tl.to(imageReveal, 1.4, { width: "0%", ease: Power2.easeInOut });
    tl.from(image, 1.4, {
      scale: 1.6,
      ease: Power2.easeInOut,
      delay: -1.4,
    });
  });

  return (
    <Layout>
      <div className="container mx-auto text-center font-poppins">
        <div className="img-containerz" ref={(el) => (container = el)}>
          <img
            ref={(el) => {
              image = el;
            }}
            src={data.img}
            alt={data.title}
            className="container max-w-4/5 mx-auto   max-h-screen object-cover rounded"
          />
        </div>
        <div className="pt-16 pb-32">
          <h2 className="text-6xl font-bold mt-6">{data.title}</h2>
          <p className="text-xl w-1/2 text-center mx-auto tracking-wide leading-relaxed mt-4">
            {data.desc}
          </p>
        </div>

        <div className="">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-semibold tracking-tight  sm:text-4xl">
              {data.title}
            </h2>

            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 lg:w-1/2">
              <img
                src={data.img}
                alt={data.title}
                className=" w-full  object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(
    "https://my-json-server.typicode.com/mohamedhadia/jsonAPI/projects"
  );
  const projects = await res.json();
  const paths = projects.map((proj) => ({
    params: { id: proj.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://my-json-server.typicode.com/mohamedhadia/jsonAPI/projects/${params.id}`
  );
  const data = await res.json();

  return {
    props: { data },
  };
}
