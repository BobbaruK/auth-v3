import { Heading, Img, Section } from "@react-email/components";

const HeaderEmail = ({ title }: { title: string }) => {
  return (
    <Section>
      {/* TODO: put the path to the svg in the public folder when build on vps */}
      <Img
        src="https://d2n7fc0kw20ri7.cloudfront.net/31mop%2Fpreview%2F71742169%2Fmain_full.png?response-content-disposition=inline%3Bfilename%3D%22main_full.png%22%3B&response-content-type=image%2Fpng&Expires=1760273950&Signature=CcqGdKc3VdNVc4yAX1q1WQgixD1qZ0l8AfJxqTkpXXFMtSpiEh2jsjHN7sa3yPEMSNKy9V9OhJNbsMM9fFYdKNL5BlcpLsBYVCEjxKvp7rvPARLpsgvQpO88Zg0LgmD~wYTIIcHf6sZpSezikegnXN58m9SZrqAt2GWnT5-k0h1kFu48AjVhxL2mUGbBi5Hkt0q6ZPXOStO1o~oalHeM399XFpURrkfzeTXXCNtI58IXdF-pV32opsg7WfMd2PwaqPGjUOvShe5tgI1m12jAclCEZtes5Ez~yy2tpBVCDtLn0oHWjhAXQdgQOPR-EWYZ5adl9TL1g0q-wRvhB7sI0Q__&Key-Pair-Id=APKAJT5WQLLEOADKLHBQ"
        alt="Cat"
        width="100"
      />
      <Heading as="h1" className="text-center font-bold text-gray-900">
        {title}
      </Heading>
    </Section>
  );
};

export default HeaderEmail;
