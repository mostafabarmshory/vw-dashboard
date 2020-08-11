

# UI

## How to address UI parts

Here is address format of each view:

	domain.view.part

All views must be placed in subdomains.

The 'mblowfish' is our default domain. For example the address of main toolbar is:

	mblowfish.default.mainToolbar

where mblowfish is domain, default is view and mainToolbar is a part. You are free to add a section 
by #.

	mblowfish.default.mainToolbar#userMenus

### mblowfish views

- default
	- mainToolbar
	- statusBar
	- navigator

## How to address actions

An action is pices of code to change data, run user request and etc.

The address of action (for data) is:

	{action name}:/{domain}/{data type}

For example:

	crate:/cms/contents

Which is a creation of a new content.
