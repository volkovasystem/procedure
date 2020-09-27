"use strict";

/*;
	@license:module:
		MIT License

		Copyright (c) 2020-present Richeve S. Bebebdor <richeve.bebedor@gmail.com>

		@license:copyright:
			Richeve S. Bebebdor

			<@license:year-range:2020-present;>

			<@license:contact-detail:richeve.bebedor@gmail.com;>
		@license:copyright;

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@license:module;
*/

const callbackOnce = require( "callback-once" );
const resolveCallback = require( "resolve-callback" );

const Option = require( "option" );
const Result = require( "result" );
const Trigger = require( "trigger" );

const PROCEDURE_CONTEXT = (
	Symbol( "procedure-context" )
);

const Procedure = (
	function Procedure( parameterList ){
		/*;
			@definition:
				@class:#Procedure
					@description:
						Option callback pattern protocol.
					@description;
				@class;

				@parameter:#parameterList
					@type:
							object:as:Array:with[
								object:as:Option,
								object:as:Result,
								object:as:Trigger,
								object,
								function
							]
					@type;

					@description:
					@description;

					@optional;
				@parameter;

				@result:#result
					@type:
							object:as:Procedure:with[
								option,
								result,
								trigger,
								proceed,
								revoke
							]
					@type;

					@description:
					@description;
				@result;

				@trigger:#trigger
					@type:
							object:as:Error
					@type;

					@description:
					@description;
				@trigger;
			@definition;
		*/

		const resolveParameterList = (
			function resolveParameterList( ){
				return	(
							Array
							.from(
								(
									arguments
								)
							)
							.reduce(
								(
									( parameterData, parameter ) => {
										if(
												(
														(
																		parameter
															instanceof	Option
														)
													===	true
												)
										){
											(
													parameterData
													.option
												=	(
														parameter
													)
											);
										}
										else
										if(
												(
														(
																		parameter
															instanceof	Result
														)
													===	true
												)
										){
											(
													parameterData
													.result
												=	(
														parameter
													)
											);
										}
										else
										if(
												(
														(
																		parameter
															instanceof	Trigger
														)
													===	true
												)
										){
											(
													parameterData
													.trigger
												=	(
														parameter
													)
											);
										}
										else
										if(
												(
														typeof
														parameter
													==	"object"
												)

											&&	(
														parameter
													!==	null
												)

											&&	(
														typeof
														parameter
														.constructor
													==	"function"
												)

											&&	(
														parameter
														.constructor
														.name
													===	"Object"
												)

											&&	(
														(
																		parameter
															instanceof	Option
														)
													!==	true
												)

											&&	(
														(
																		parameter
															instanceof	Result
														)
													!==	true
												)

											&&	(
														(
																		parameter
															instanceof	Trigger
														)
													!==	true
												)
										){
											(
													parameterData
													.contextData
												=	(
														parameter
													)
											);
										}
										else
										if(
												(
														typeof
														parameter
													==	"function"
												)
										){
											(
													parameterData
													.proceed
												=	(
														parameter
													)
											);
										}
										else
										if(
												(
														typeof
														parameter
													!=	"function"
												)

											&&	(
														typeof
														parameter
														.constructor
													==	"function"
												)

											&&	(
														parameter
														.constructor
														.name
													!==	"Object"
												)
										){
											(
													parameterData
													.contextList
												=	(
															(
																parameterData
																.contextList
															)

														||	(
																[ ]
															)
													)
											);

											parameterData
											.contextList
											.push(
												(
													parameter
												)
											);
										}

										return	(
													parameterData
												);
									}
								),

								(
									{ }
								)
							)
						);
			}
		);

		if(
				(
						(
										this
							instanceof	Procedure
						)
					===	true
				)
		){
			const	{
						contextData,
						contextList,
						option,
						result,
						trigger,
						proceed
					}
				=	(
						resolveParameterList
						.apply(
							(
								this
							),

							(
								Array
								.from(
									(
										arguments
									)
								)
							)
						)
					);

			if(
					(
							(
											option
								instanceof	Option
							)
						===	true
					)
			){
				(
						this[ PROCEDURE_CONTEXT ]
					=	(
							option
							.getContext( )
						)
				);
			}
			else if(
					(
							typeof
							contextData
						==	"object"
					)

				&&	(
							contextData
						!==	null
					)
			){
				(
						this[ PROCEDURE_CONTEXT ]
					=	(
							contextData
						)
				);
			}
			else{
				(
						this[ PROCEDURE_CONTEXT ]
					=	(
							{ }
						)
				);
			}

			return	(
						this
					);
		}
		else{
			const	{
						contextData,
						contextList,
						option,
						result,
						trigger,
						proceed
					}
				=	(
						resolveParameterList
						.apply(
							(
								null
							),

							(
								Array
								.from(
									(
										arguments
									)
								)
							)
						)
					);



		}
	}
);

const ProcedurePrototype = (
		Procedure
		.prototype
	=	(
			Object
			.create(
				(
					Array
					.prototype
				)
			)
		)
);

ProcedurePrototype.getContext = (
	function getContext( ){
		return	(
					this[ PROCEDURE_CONTEXT ]
				);
	}
);

const proceedFlow = (
	function proceedFlow( propertyList, condition, providerList ){
		const parameterList = (
			Array
			.from(
				(
					arguments
				)
			)
		);

		(
				propertyList
			=	(
					parameterList
					.filter(
						(
							( parameter ) => (
									(
											typeof
											parameter
										==	"string"
									)

								&&	(
											parameter
											.length
										>	0
									)
							)
						)
					)
				)
		);

		if(
				(
						Array
						.isArray(
							(
								propertyList
							)
						)
					===	true
				)

			&&	(
						propertyList
						.length
					>	0
				)
		){
			(
					condition
				=	(
						parameterList
						.find(
							(
								( parameter ) => (
										(
												typeof
												parameter
											==	"function"
										)
								)
							)
						)
					)
			);
		}

		(
				providerList
			=	(
					parameterList
					.filter(
						(
							( parameter ) => (
									(
											typeof
											parameter
										==	"function"
									)

								&&	(
											parameter
										!==	condition
									)
							)
						)
					)
				)
		);



		if(
				(
						Array
						.isArray(
							(
								propertyList
							)
						)
					===	true
				)

			&&	(
						propertyList
						.length
					>	0
				)

			&&	(
						typeof
						condition
					==	"function"
				)
		){
			while(
					(
							propertyList
							.length
						>	0
					)
			){
				const property = (
					propertyList
					.shift( )
				);

				const pipeProvider = (
					function pipe( ){
						return	(
									condition(
										(
											{
												"property": (
													property
												),

												"value": (
													option[ property ]
												),

												"source": (
													option
												),

												"target": (
													result
												)
											}
										)
									)
								);
					}
				);

				(
						pipeProvider
						.property
					=	(
							property
						)
				);

				this
				.push(
					(
						pipeProvider
					)
				);

				const flowProvider = (
					function flow( ){
						while(
								(
										providerList
										.length
									>	0
								)
						){
							result(
								(
									providerList
									.shift( )
									.call(
										(
											option
										),

										(
											{
												"property": (
													property
												),

												"value": (
													option[ property ]
												),

												"source": (
													option
												),

												"target": (
													result
												)
											}
										)
									)
								)
							);
						}

						return	(
									result( )
								);
					}
				);
			}
		}
		else{
			const flowProvider = (
				function flow( ){
					while(
							(
									providerList
									.length
								>	0
							)
					){
						result(
							(
								providerList
								.shift( )
								.apply(
									(
										option
									),

									(
										Array
										.from(
											(
												arguments
											)
										)
									)
								)
							)
						);
					}

					return	(
								result( )
							);
				}
			);
		}

		return	(
					this
				);
	}
);

(
		ProcedurePrototype
		.proceed
	=	(
			ProcedurePrototype
			.proceedFlow
		=	(
				proceedFlow
			)
		)
);

const doneFlow = (
	function doneFlow( ){

	}
);

(
		ProcedurePrototype
		.done
	=	(
				ProcedurePrototype
				.doneFlow
			=	(
					doneFlow
				)
		)
);

ProcedurePrototype.valueOf = (
	function valueOf( ){
		return	(
					this
				);
	}
);

ProcedurePrototype.toJSON = (
	function toJSON( ){
		return	(
					Object
					.entries(
						(
							this
							.valueOf( )
						)
					)
					.reduce(
						(
							( source, [ property, value ] ) => (
								(
										source[ property ]
									=	(
											value
											.toString( )
										)
								),

								(
									source
								)
							)
						),

						(
							{ }
						)
					)
				);
	}
);

ProcedurePrototype.toString = (
	function toString( ){
		return	(
					JSON
					.stringify(
						(
							this
							.toJSON( )
						)
					)
				);
	}
);

module.exports = Procedure;
