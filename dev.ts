import { Environment, NodeFileSystemLoader } from "liquidscript";

const liquid = new Environment({
  loader: new NodeFileSystemLoader("./templates/", {
    fileExtension: ".liquid",
  }),
});

const template = liquid.getTemplateSync("index");
