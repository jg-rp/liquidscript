async function linkToTag(left, tag) {
  const handle = await this.context.resolve("handle");
  return `<a title="Show tag ${tag}" href="/collections/${handle}/${tag}">${left}</a>`;
}

function highlighActiveTag(tag, cssClass = "active") {
  return `<span class="${cssClass}">${tag}</span>`;
}

async function linkToAddTag(left, tag) {
  const handle = await this.context.resolve("handle");
  const tags = [...(await this.context.resolve("current_tags")), tag].join("+");
  return `<a title="Show tag ${tag}" href="/collections/${handle}/${tags}">${left}</a>`;
}

async function linkToRemoveTag(left, tag) {
  const handle = await this.context.resolve("handle");
  const tags = [...(await this.context.resolve("current_tags")), tag]
    .filter((t) => t !== tag)
    .join("+");
  return `<a title="Hide tag ${tag}" href="/collections/${handle}/${tags}">${left}</a>`;
}

module.exports = {
  linkToTag,
  highlighActiveTag,
  linkToAddTag,
  linkToRemoveTag,
};
