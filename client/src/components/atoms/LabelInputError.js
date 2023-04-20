import React from 'react'

export default function LabelInputError(props) {
  return (
    <div className="block w-full px-3 pt-2 pb-4 text-red-600 text-xs tablet:text-sm">
        {props.children ?? 'Error: Something is wrong with this input.'}
    </div>
  )
}