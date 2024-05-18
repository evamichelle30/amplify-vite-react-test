import { Button } from "@aws-amplify/ui-react"

export default function NavButton(props: { path: string; onClick: ()=>void; labelKey: string; }) {
    const { path: path, onClick: onClick, labelKey: labelKey } = props;

    return (
        <Button className={location.pathname === path ? "current" : ""} size="large" onClick={onClick}>{labelKey}</Button>
    );
}