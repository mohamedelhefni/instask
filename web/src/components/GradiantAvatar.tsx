interface AvatarProps {
    name: string
}

export function GradiantAvatar({ name }: AvatarProps) {
    let gradiants = [" bg-gradient-to-r from-orange-500 to-pink-800", " bg-gradient-to-r from-blue-500 to-green-800", " bg-gradient-to-r from-yellow-500 to-fuchsia-800"]
    return <>
        <div className={`flex items-center justify-center  font-bold  w-8 h-8 rounded-full text-white  ${gradiants[name.charCodeAt(0) % gradiants.length]}`} >
            {name[0].toUpperCase()}
        </div>
    </>
}