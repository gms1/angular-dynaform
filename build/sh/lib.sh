
set -o pipefail

#---------------------------------------------------------
errormsg() {
  echo "$@" >&2
}

#---------------------------------------------------------
die() {
  errormsg "ERROR: $@"
  exit 1
}

#---------------------------------------------------------
syncfileset() {
  SET=( "$@" )
  SRC_SET=()
  TRG_SET=()
  rc=0

  pushd "${PROJ_HOME}" &>/dev/null        || die "failed to cwd '${PROJ_HOME}'"
    for file in "${SET[@]}"; do
      testgitchanged=$(git diff --name-only "${file}")
      if [ -n "${testgitchanged}" ]; then
        echo "  ${file} changed"
        SRC_SET+=( "${file}" )
      else
        TRG_SET+=( "${file}" )
      fi
    done
    echo ""
    changed=${#SRC_SET[@]}
    if [ "${changed}" -eq 0 ]; then
      echo "nothing to do"
      return 0
    elif [ "${changed}" -gt 1 ]; then
      errormsg "more than one file changed"
      return 1
    fi
    srcfile=${SRC_SET[0]}
    for file in "${TRG_SET[@]}"; do
      cp -a "${srcfile}" "${file}"
      if [ $? -eq 0 ]; then
        echo "  ${file} updated"
      else
        echo "! ${file} SKIPPED"
        rc=1
      fi
    done
  popd &>/dev/null
  if [ "${rc}" -eq 0 ]; then
    echo "succeeded"
    return 0
  else
    errormsg "FAILED"
    return 1
  fi
}
