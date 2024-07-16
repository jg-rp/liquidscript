import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

const FeatureList = [
  {
    title: "Compatible",
    Svg: require("@site/static/img/undraw_code_typing_re_p8b9.svg").default,
    description: (
      <>
        LiquidScript strives to be{" "}
        <Link to="./known_issues">100% compatible</Link> with the reference
        implementation of Liquid, written in Ruby. Including Liquid integer and
        float data types, and built-in filters that perform decimal arithmetic.
      </>
    ),
  },
  {
    title: "Safe",
    Svg: require("@site/static/img/undraw_security_re_a2rk.svg").default,
    description: (
      <>
        Designed for situations where template authors are untrusted,
        LiquidScript is non{" "}
        <Link to="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval">
          evaluating
        </Link>
        , it guards against mutation of{" "}
        <Link to="/introduction/render-context#environment-globals">
          shared template data
        </Link>
        , and will never call arbitrary functions or methods on{" "}
        <Link to="/introduction/render-context"> render context</Link> objects.
      </>
    ),
  },
  {
    title: "Flexible",
    Svg: require("@site/static/img/undraw_code_review_re_woeb.svg").default,
    description: (
      <>
        Add to, remove or replace built-in <Link to="/language/tags">tags</Link>{" "}
        and <Link to="/language/filters">filters</Link> to suit your needs.
        Define custom template <Link to="/guides/custom-loaders">loaders</Link>{" "}
        to read template source text from a database, a remote file system, or
        parse front matter data.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
