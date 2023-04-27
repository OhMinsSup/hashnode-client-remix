import React, { useCallback } from 'react'
import { Icons } from '~/components/shared/Icons'

interface ProfileImageProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ProfileImage(props: ProfileImageProps) {
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(event)
  }, [props.onChange])

  return (
    <label className="input-upload" id="customFile">
      <Icons.Cloud className="h-10 w-10 fill-current" />
      <span className="mt-2 text-xs font-semibold leading-normal">
        Upload Photo
      </span>
      <input
        type="file"
        accept=".png, .jpg, .jpeg, .gif"
        className="hidden"
        id="customFile"
        onChange={onChange}
      />
    </label >
  )
}

ProfileImage.Loading = function Loading() {
  return (
    <label className="flex flex-col items-center justify-center w-40 h-40 tracking-wide text-slate-500 uppercase bg-white border rounded-full shadow cursor-pointer custom-file">
      <svg className="w-16 h-16 fill-current animate-spin" viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0V0z"></path>
        <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path>
      </svg>
    </label>
  )
}

interface SuccessProps {
  url: string
  onDelete?: () => void
}

ProfileImage.Success = function Success({ url, onDelete }: SuccessProps) {
  return (
    <div className="relative block w-40 h-40 bg-slate-100 rounded-full shadow-xl">
      <a className="block overflow-hidden rounded-full" href={url} target="_blank">
        <img className="block" src={url} />
      </a>
      <button type="button" onClick={onDelete} className="absolute top-0 right-0 z-10 p-2 text-slate-700 bg-white border rounded-full">
        <Icons.Trash className="w-4 h-4 stroke-current" />
      </button>
    </div>
  )
}
