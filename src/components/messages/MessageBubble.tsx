
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MessageBubble({ message }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    message: any
}) {
    return (
        <div className="break-normal">
            <Markdown remarkPlugins={[remarkGfm]}>{message}</Markdown>
        </div>
    )
}