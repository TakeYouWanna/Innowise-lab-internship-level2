# InnowiseLabInternshipLevel2

[TASK](https://docs.google.com/document/d/1K79_NA4lMYfqQiIJGqLDek1K9z-oc2qg8n4AvrN1PXE/edit)

# DEMO

[Demo version of the project](http://takeyouwanna.github.io/)

# How to run the app

1. Clone this repository

```
$ git clone https://github.com/TakeYouWanna/Innowise-lab-internship-level2
```

2. Open the directory in VSCode

3. Open a terminal in VSCode and install the NPM module

```
$ npm install
```

4. Run the application with the command

```
$ ng serve --open
```

# FOLDERS STRUCTURE

```
└──src
    └──app
        ├──modules
             ├──auth
                  ├──login-page                 #login component folder
                  ├──register-page              #register component folder
                  ├──auth-routing.module.ts     #routing module for load auth component and routing in auth module
                  ├──auth.component.html        #container for register or login component (with routing)
                  ├──auth.component.scss        #style for login/register container
                  ├──auth.component.ts          #component for this login/register container
                  └──auth.module.ts             #auth module for lazy load
                  
             ├──gallery
                  ├──gallery-routing.module.ts	#routing module for load gallery component
                  ├──gallery.component.html   	# \
                  ├──gallery.component.scss     # # gallery component
                  ├──gallery.component.ts       # /
                  └──gallery.module.ts          #gallery module for lazy load

             ├──my-gallery
                  ├──gallery-routing.module.ts  #routing module for load my-gallery component
                  ├──gallery.component.html     # \
                  ├──gallery.component.scss     # # my-gallery component
                  ├──gallery.component.ts       # /
                  └──gallery.module.ts          #my-gallery module for lazy load

               ├──mini-paint
					├──drawing-properties				#component with properties form for drawing
					├──drawing-tools					#component with tools for drawing (and save/clear)
                    ├──mini-paint-routing.module.ts		#routing module for mini-paint
                    ├──mini-paint.component.html   		# \
                	  ├──mini-paint.component.scss  	# # mini-paint component
				          	├──mini-paint.component.ts  # /
                  	└──mini-paint.module.ts   	        #mini-paint module for lazy load

	    	├──store    			                	#contains actions, reducers, effects, selectors for data processing
				    ├──picture-list						#folder containing files for processing picture list data
				    ├──toast-notice					    #folder containing files for processing toast notice
				    ├──user								#folder containing files for processing user data
				    └──index.ts							#contains all state and reducers

        └──shared
            ├──interfaces                            	#interfaces for the project
            ├──services
                    ├──drawing                          #services drawing
					    ├──classes						#classes for drawing
					        ├──drawing-method.ts		#class for choosing a drawing method
					        ├──drawing.ts				#abstraction class for drawing tools class
					        ├──coordinates.ts			#click position class
					        ├──star-drawing.ts			#class for star drawing
					        └── ...other classes 		#other drawing classes are extensible
			            ├──interfaces 					#interfaces for drawing
                        └──drawing.service.ts			#the main drawing service that starts drawing
                    └──firebase                         services for working with firestore/firebase-Auth

            └──components
			      ├──toast-notice	                    #component to dynamically insert it in the form of toast notifications
                  └──top-bar                          	#top-bar component with navigation

    ├──environments                                     #contains information about firebase server
    ├──assets 	                                  		#contains icons for project
    └──index.scss										#the main styles for project (changing the style of the entire project)
```

# FIRESTORE STRUCTURE

```
    └──Images                       #main collection for users
          └──ImagesId               #user id
                  ├──ImageSrc  		#link to image
				  ├──Author 		#user email
				  └──date		    #date added

```

# APPLICATION STACK

#### used libraries

## RxJS

#### used for processing and working with data

## NgRx

#### used to organize memory

## Prettier

#### used for formatting code

## Eslint

#### used for syntactic checking
