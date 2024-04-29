#!/bin/bash

# .env 파일에서 환경 변수 읽기
source .env

# 환경별로 환경 변수 설정
# if [ "$1" == "dev" ]; then
#     export TIPTAP_PRO_TOKEN=$TIPTAP_PRO_TOKEN
# elif [ "$1" == "prod" ]; then
#     export TIPTAP_PRO_TOKEN=$TIPTAP_PRO_TOKEN
# elif [ "$1" == "staging" ]; then
#     export TIPTAP_PRO_TOKEN=$TIPTAP_PRO_TOKEN
# else
#     echo "Invalid environment. Please specify 'dev', 'prod', or 'staging'."
#     exit 1
# fi
export TIPTAP_PRO_TOKEN=$TIPTAP_PRO_TOKEN

# .npmrc 파일에 환경 변수 설정
echo "legacy-peer-deps=true

@tiptap-pro:registry=https://registry.tiptap.dev/
//registry.tiptap.dev/:_authToken=${TIPTAP_PRO_TOKEN}" > .npmrc

# # npm install 실행
# pnpm install

# # 환경 변수 제거
# unset TIPTAP_PRO_TOKEN

# sh 스크립트 종료하고 다음 스크립트 실행
exit 0