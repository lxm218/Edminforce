
## ----------------- Schemas ----------------- ##

# TODO: move to utils package

SimpleSchema.extendOptions
  editable: Match.Optional(Boolean)             # editable: editable by document owner
  editableBy: Match.Optional([String])
#  toBeVerified: Match.Optional(Boolean)        # toBeVerified: doctor's info (changes) needs to be verified by admin