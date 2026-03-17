import Link from 'next/link';
import parse, { domToReact } from 'html-react-parser';

const isInternal = (href) => {
  if (!href) return false;
  return href.startsWith('/') || href.startsWith('#');
};

const options = {
  replace(domNode) {
    if (domNode.name === 'a' && domNode.attribs) {
      const { href, class: className, ...rest } = domNode.attribs;
      if (isInternal(href)) {
        return (
          <Link href={href} className={className} {...rest}>
            {domToReact(domNode.children, options)}
          </Link>
        );
      }
    }
  }
};

export default function HtmlContent({ html, as: Tag = 'p', className }) {
  if (!html) return null;
  return <Tag className={className}>{parse(html, options)}</Tag>;
}
